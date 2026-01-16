import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { setCredentials, logout as logoutAction, setUser } from '@/stores/auth/auth.slice'
import { authService } from '../services/auth.service'
import type { RegisterDto, LoginDto, ChangePasswordDto, UpdateProfileDto } from '../types/auth.types'

/**
 * Hook to get current auth state
 */
export function useAuth() {
	const { user, accessToken, isAuthenticated, isLoading: authLoading } = useAppSelector(
		(state) => state.auth
	)
	const { data: profile, isLoading: profileLoading } = useProfile()

	return {
		user: profile || user,
		accessToken,
		isAuthenticated: !!accessToken,
		// Loading if: auth is initializing OR (we have a token and profile is loading)
		isLoading: authLoading || (!!accessToken && profileLoading),
	}
}

/**
 * Hook to register a new user
 */
export function useRegister() {
	const dispatch = useAppDispatch()
	const router = useRouter()

	return useMutation({
		mutationFn: (data: RegisterDto) => authService.register(data),
		onSuccess: (data) => {
			dispatch(
				setCredentials({
					user: data.user,
					accessToken: data.accessToken,
				})
			)
			toast.success('Account created successfully!')
			router.push('/')
		},
		onError: (error: Error & { response?: { data?: { message?: string } } }) => {
			toast.error(error.response?.data?.message || 'Registration failed')
		},
	})
}

/**
 * Hook to login a user
 */
export function useLogin() {
	const dispatch = useAppDispatch()
	const router = useRouter()

	return useMutation({
		mutationFn: (data: LoginDto) => authService.login(data),
		onSuccess: (data) => {
			dispatch(
				setCredentials({
					user: data.user,
					accessToken: data.accessToken,
				})
			)
			toast.success('Logged in successfully!')
			router.push('/')
		},
		onError: (error: Error & { response?: { data?: { message?: string } } }) => {
			toast.error(error.response?.data?.message || 'Login failed')
		},
	})
}

/**
 * Hook to logout a user
 */
export function useLogout() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			dispatch(logoutAction())
			queryClient.clear()
			toast.success('Logged out successfully')
			router.push('/auth/login')
		},
	})
}

/**
 * Hook to get user profile
 */
export function useProfile() {
	const { accessToken } = useAppSelector((state) => state.auth)

	return useQuery({
		queryKey: ['profile'],
		queryFn: () => authService.getProfile(),
		retry: false,
		enabled: !!accessToken, // Only fetch if we have a token
	})
}

/**
 * Hook to update user profile
 */
export function useUpdateProfile() {
	const dispatch = useAppDispatch()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: UpdateProfileDto) => authService.updateProfile(data),
		onSuccess: (data) => {
			dispatch(setUser(data))
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('Profile updated successfully')
		},
		onError: (error: Error & { response?: { data?: { message?: string } } }) => {
			toast.error(error.response?.data?.message || 'Update failed')
		},
	})
}

/**
 * Hook to change password
 */
export function useChangePassword() {
	return useMutation({
		mutationFn: (data: ChangePasswordDto) => authService.changePassword(data),
		onSuccess: () => {
			toast.success('Password changed successfully')
		},
		onError: (error: Error & { response?: { data?: { message?: string } } }) => {
			toast.error(error.response?.data?.message || 'Password change failed')
		},
	})
}
