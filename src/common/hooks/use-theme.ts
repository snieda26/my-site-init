import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { setTheme as setThemeAction, toggleTheme as toggleThemeAction } from '@/stores/theme/theme.slice'

/**
 * Hook to manage theme state with Redux
 */
export function useTheme() {
	const dispatch = useAppDispatch()
	const theme = useAppSelector((state) => state.theme.theme)

	const setTheme = useCallback(
		(newTheme: 'light' | 'dark') => {
			dispatch(setThemeAction(newTheme))
			document.documentElement.setAttribute('data-theme', newTheme)
			localStorage.setItem('theme', newTheme)
		},
		[dispatch]
	)

	const toggleTheme = useCallback(() => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		dispatch(toggleThemeAction())
		document.documentElement.setAttribute('data-theme', newTheme)
		localStorage.setItem('theme', newTheme)
	}, [dispatch, theme])

	return {
		theme,
		setTheme,
		toggleTheme,
		isDark: theme === 'dark',
		isLight: theme === 'light',
	}
}
