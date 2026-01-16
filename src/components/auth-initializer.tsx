'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/stores/hooks'
import { setAccessToken, setLoading } from '@/stores/auth/auth.slice'
import Cookies from 'js-cookie'

/**
 * Initializes auth state from cookies on app load
 * This ensures the app restores authentication after page refresh
 */
export function AuthInitializer() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		// Read access token from cookies
		const accessToken = Cookies.get('accessToken')

		if (accessToken) {
			// Restore auth state with token
			// The useProfile hook will then fetch user data
			dispatch(setAccessToken(accessToken))
		} else {
			// No token found, stop loading
			dispatch(setLoading(false))
		}
	}, [dispatch])

	return null
}
