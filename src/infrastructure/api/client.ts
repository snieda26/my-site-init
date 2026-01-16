import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from '@/common/constants/api.constants'

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

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

		// If error is 401 and we haven't retried yet
		if (error.response?.status === 401 && !originalRequest._retry) {
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

				// Clear tokens and redirect to login
				Cookies.remove('accessToken')

				if (typeof window !== 'undefined') {
					window.location.href = '/auth/login'
				}

				return Promise.reject(refreshError)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)

export default apiClient
