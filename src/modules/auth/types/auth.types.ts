export interface User {
	id: string
	email: string
	name?: string
	emailVerified?: boolean
}

export interface AuthResponse {
	user: User
	accessToken: string
}

export interface RegisterFormData {
	name: string
	email: string
	password: string
}

export interface LoginFormData {
	email: string
	password: string
}

export interface RegisterDto {
	name: string
	email: string
	password: string
}

export interface LoginDto {
	email: string
	password: string
}

export interface ChangePasswordDto {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

export interface UpdateProfileDto {
	name?: string
	email?: string
}
