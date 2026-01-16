'use client'

import { useAuth } from '../hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface GuestGuardProps {
	children: ReactNode
	fallback?: ReactNode
	redirectTo?: string
}

/**
 * Guard component that redirects authenticated users away from auth pages
 */
export function GuestGuard({
	children,
	fallback = null,
	redirectTo = '/',
}: GuestGuardProps) {
	const { isAuthenticated, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			router.replace(redirectTo)
		}
	}, [isAuthenticated, isLoading, router, redirectTo])

	if (isLoading) {
		return <>{fallback}</>
	}

	if (isAuthenticated) {
		return null
	}

	return <>{children}</>
}
