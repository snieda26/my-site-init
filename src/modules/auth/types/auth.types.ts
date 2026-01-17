export interface User {
	id: string
	email: string
	name?: string
	avatarUrl?: string
	emailVerified: boolean
	onboardingCompleted?: boolean
	role?: 'USER' | 'ADMIN'
	createdAt?: string
}

export interface AuthResponse {
	account: User
	accessToken: string
}

export interface RegisterFormData {
	name: string
	email: string
	password: string
	confirmPassword: string
}

export interface LoginFormData {
	email: string
	password: string
}

export interface RegisterDto {
	name?: string
	email: string
	password: string
	confirmPassword: string
	recaptchaToken?: string
}

export interface LoginDto {
	email: string
	password: string
	recaptchaToken?: string
}

export interface ChangePasswordDto {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

export interface UpdateProfileDto {
	name?: string
	avatarUrl?: string | null
}
