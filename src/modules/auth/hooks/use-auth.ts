'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { setCredentials, logout as logoutAction, setUser } from '@/stores/auth/auth.slice'
import { authService } from '../services/auth.service'
import { useLocale } from '@/common/hooks/use-locale'
import type { RegisterDto, LoginDto, ChangePasswordDto, UpdateProfileDto } from '../types/auth.types'

interface ApiErrorResponse {
	message: string
	statusCode: number
	error?: string
}

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
 * @param skipRedirect - If true, won't redirect after successful registration (for modal use)
 */
export function useRegister(skipRedirect = false) {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const locale = useLocale()

	return useMutation<
		Awaited<ReturnType<typeof authService.register>>,
		AxiosError<ApiErrorResponse>,
		RegisterDto
	>({
		mutationFn: (data: RegisterDto) => authService.register(data),
		onSuccess: (data) => {
			dispatch(
				setCredentials({
					user: data.account,
					accessToken: data.accessToken,
				})
			)
			toast.success('Account created successfully!')
			if (!skipRedirect) {
				router.push(`/${locale}/interview-questions`)
			}
		},
	})
}

/**
 * Hook to login a user
 * @param skipRedirect - If true, won't redirect after successful login (for modal use)
 */
export function useLogin(skipRedirect = false) {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const locale = useLocale()

	return useMutation<
		Awaited<ReturnType<typeof authService.login>>,
		AxiosError<ApiErrorResponse>,
		LoginDto
	>({
		mutationFn: (data: LoginDto) => authService.login(data),
		onSuccess: (data) => {
			dispatch(
				setCredentials({
					user: data.account,
					accessToken: data.accessToken,
				})
			)
			toast.success('Logged in successfully!')
			if (!skipRedirect) {
				router.push(`/${locale}/interview-questions`)
			}
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
	const locale = useLocale()

	return useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			dispatch(logoutAction())
			queryClient.clear()
			toast.success('Logged out successfully')
			router.push(`/auth/login/${locale}`)
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
		retry: 1, // Retry once on failure
		retryDelay: 500,
		enabled: !!accessToken, // Only fetch if we have a token
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
	})
}

/**
 * Hook to update user profile
 */
export function useUpdateProfile() {
	const dispatch = useAppDispatch()
	const queryClient = useQueryClient()

	return useMutation<
		Awaited<ReturnType<typeof authService.updateProfile>>,
		AxiosError<ApiErrorResponse>,
		UpdateProfileDto
	>({
		mutationFn: (data: UpdateProfileDto) => authService.updateProfile(data),
		onSuccess: (data) => {
			dispatch(setUser(data))
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('Profile updated successfully')
		},
		onError: (error) => {
			const message = error.response?.data?.message || 'Update failed'
			toast.error(message)
		},
	})
}

/**
 * Hook to change password
 */
export function useChangePassword() {
	return useMutation<void, AxiosError<ApiErrorResponse>, ChangePasswordDto>({
		mutationFn: (data: ChangePasswordDto) => authService.changePassword(data),
		onSuccess: () => {
			toast.success('Password changed successfully')
		},
		onError: (error) => {
			const message = error.response?.data?.message || 'Password change failed'
			toast.error(message)
		},
	})
}
