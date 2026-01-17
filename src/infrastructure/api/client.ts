import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from '@/common/constants/api.constants'
import { store } from '@/stores'
import { logout } from '@/stores/auth/auth.slice'

export const apiClient = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request interceptor - add access token
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const accessToken = Cookies.get('accessToken')

		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		return config
	},
	(error) => Promise.reject(error)
)

// Response interceptor - handle token refresh
let isRefreshing = false
let failedQueue: Array<{
	resolve: (token: string) => void
	reject: (error: AxiosError) => void
}> = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
	failedQueue.forEach((promise) => {
		if (error) {
			promise.reject(error)
		} else if (token) {
			promise.resolve(token)
		}
	})
	failedQueue = []
}

// Auth endpoints that should NOT trigger token refresh on 401
const AUTH_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh']

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
		const requestUrl = originalRequest?.url || ''

		// Skip token refresh for auth endpoints - they should return errors directly
		const isAuthEndpoint = AUTH_ENDPOINTS.some(endpoint => requestUrl.includes(endpoint))

		// If error is 401, we haven't retried yet, and it's NOT an auth endpoint
		if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
			if (isRefreshing) {
				// Queue the request while token is being refreshed
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then((token) => {
						if (originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`
						}
						return apiClient(originalRequest)
					})
					.catch((err) => Promise.reject(err))
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				// Try to refresh token
				const response = await axios.post(
					`${API_URL}/auth/refresh`,
					{},
					{ withCredentials: true }
				)

				const { accessToken } = response.data
				Cookies.set('accessToken', accessToken)

				processQueue(null, accessToken)

				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${accessToken}`
				}

				return apiClient(originalRequest)
			} catch (refreshError) {
				processQueue(refreshError as AxiosError, null)

				// Clear tokens and Redux state
				Cookies.remove('accessToken')
				store.dispatch(logout())

				return Promise.reject(refreshError)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)

export default apiClient
