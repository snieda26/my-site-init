'use client'

import { AuthGuard } from '@/modules/auth'
import { ReactNode } from 'react'

interface ProtectedLayoutProps {
  children: ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <AuthGuard redirectTo="/auth/login">{children}</AuthGuard>
}
