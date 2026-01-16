/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
	return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param password - The password to validate
 * @param options - Validation options
 */
export function isValidPassword(
	password: string,
	options: {
		minLength?: number
		requireUppercase?: boolean
		requireLowercase?: boolean
		requireNumber?: boolean
		requireSpecial?: boolean
	} = {}
): boolean {
	const {
		minLength = 6,
		requireUppercase = false,
		requireLowercase = false,
		requireNumber = false,
		requireSpecial = false,
	} = options

	if (password.length < minLength) return false
	if (requireUppercase && !/[A-Z]/.test(password)) return false
	if (requireLowercase && !/[a-z]/.test(password)) return false
	if (requireNumber && !/[0-9]/.test(password)) return false
	if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false

	return true
}

/**
 * Validate image file type
 */
export function isValidImageFile(file: File): boolean {
	const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
	return validTypes.includes(file.type)
}

/**
 * Validate file size (in bytes)
 */
export function isValidFileSize(file: File, maxSizeMB: number): boolean {
	const maxSizeBytes = maxSizeMB * 1024 * 1024
	return file.size <= maxSizeBytes
}
