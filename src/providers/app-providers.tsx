'use client'

import type { ReactNode } from 'react'
import { QueryProvider } from './query-provider'
import { ToastProvider } from './toast-provider'
import { ReduxProvider } from './redux-provider'
import { AuthInitializer } from '@/components/auth-initializer'
import { ThemeInitializer } from '@/components/theme-initializer'

interface AppProvidersProps {
	children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
	return (
		<ReduxProvider>
			<QueryProvider>
				<AuthInitializer />
				<ThemeInitializer />
				{children}
				<ToastProvider />
			</QueryProvider>
		</ReduxProvider>
	)
}
