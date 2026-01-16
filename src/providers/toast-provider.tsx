'use client'

import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
	return (
		<Toaster
			position="bottom-right"
			toastOptions={{
				duration: 4000,
				style: {
					background: 'var(--color-card)',
					color: 'var(--color-foreground)',
					border: '1px solid var(--color-border)',
					borderRadius: '12px',
					padding: '12px 16px',
				},
				success: {
					iconTheme: {
						primary: '#22c55e',
						secondary: '#ffffff',
					},
				},
				error: {
					iconTheme: {
						primary: '#ef4444',
						secondary: '#ffffff',
					},
				},
			}}
		/>
	)
}
