'use client'

import { useAuth } from '../hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface AuthGuardProps {
	children: ReactNode
	fallback?: ReactNode
	redirectTo?: string
}

/**
 * Guard component that protects routes requiring authentication
 */
export function AuthGuard({
	children,
	fallback = null,
	redirectTo = '/auth/login',
}: AuthGuardProps) {
	const { isAuthenticated, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.replace(redirectTo)
		}
	}, [isAuthenticated, isLoading, router, redirectTo])

	if (isLoading) {
		return <>{fallback}</>
	}

	if (!isAuthenticated) {
		return null
	}

	return <>{children}</>
}
