// Services
export { authService } from './services/auth.service'

// Hooks
export {
	useAuth,
	useRegister,
	useLogin,
	useLogout,
	useProfile,
	useUpdateProfile,
	useChangePassword,
} from './hooks/use-auth'

// Types
export type {
	User,
	AuthResponse,
	RegisterFormData,
	LoginFormData,
	RegisterDto,
	LoginDto,
	ChangePasswordDto,
	UpdateProfileDto,
} from './types/auth.types'

// Guards
export { AuthGuard, GuestGuard } from './guards'

// Components
export { LoginForm, RegisterForm, GoogleSignInButton } from './components'
