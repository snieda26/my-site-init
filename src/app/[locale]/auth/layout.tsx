'use client'

import { GuestGuard } from '@/modules/auth'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <GuestGuard redirectTo="/">{children}</GuestGuard>
}
