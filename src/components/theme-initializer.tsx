'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/stores/hooks'
import { setTheme } from '@/stores/theme/theme.slice'

/**
 * Initializes theme from localStorage on app load
 * Ensures the theme persists across page refreshes
 */
export function ThemeInitializer() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		// Read theme from localStorage
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
		const theme = savedTheme || 'dark'

		dispatch(setTheme(theme))
		document.documentElement.setAttribute('data-theme', theme)
	}, [dispatch])

	return null
}
