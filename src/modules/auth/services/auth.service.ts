import apiClient from '@/infrastructure/api/client'
import Cookies from 'js-cookie'
import type {
	AuthResponse,
	RegisterDto,
	LoginDto,
	ChangePasswordDto,
	UpdateProfileDto,
	User,
} from '../types/auth.types'

export const authService = {
	async register(data: RegisterDto): Promise<AuthResponse> {
		const response = await apiClient.post<AuthResponse>('/auth/register', data)

		// Store access token
		if (response.data.accessToken) {
			Cookies.set('accessToken', response.data.accessToken, { expires: 7 })
		}

		return response.data
	},

	async login(data: LoginDto): Promise<AuthResponse> {
		const response = await apiClient.post<AuthResponse>('/auth/login', data)

		// Store access token
		if (response.data.accessToken) {
			Cookies.set('accessToken', response.data.accessToken, { expires: 7 })
		}

		return response.data
	},

	async logout(): Promise<void> {
		await apiClient.post('/auth/logout')
		Cookies.remove('accessToken')
	},

	async refreshToken(): Promise<{ accessToken: string }> {
		// Refresh token is automatically sent via httpOnly cookie
		const response = await apiClient.post<{ accessToken: string }>('/auth/refresh', {})
		Cookies.set('accessToken', response.data.accessToken, { expires: 7 })
		return response.data
	},

	async verifyEmail(token: string): Promise<{ message: string }> {
		const response = await apiClient.get<{ message: string }>(`/auth/verify?token=${token}`)
		return response.data
	},

	async getProfile(): Promise<User> {
		const response = await apiClient.get<User>('/account/profile')
		return response.data
	},

	async updateProfile(data: UpdateProfileDto): Promise<User> {
		const response = await apiClient.patch<User>('/account/profile', data)
		return response.data
	},

	async changePassword(data: ChangePasswordDto): Promise<{ message: string }> {
		const response = await apiClient.patch<{ message: string }>('/account/password', data)
		return response.data
	},
}

export default authService
