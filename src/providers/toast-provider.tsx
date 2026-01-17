'use client'

import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
	return (
		<Toaster
			position="top-right"
			containerStyle={{
				zIndex: 99999,
			}}
			toastOptions={{
				duration: 4000,
				style: {
					background: '#1a1a2e',
					color: '#ffffff',
					border: '1px solid rgba(255, 255, 255, 0.1)',
					borderRadius: '12px',
					padding: '12px 16px',
					fontSize: '14px',
					fontWeight: 500,
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
					style: {
						background: '#1a1a2e',
						color: '#ef4444',
						border: '1px solid rgba(239, 68, 68, 0.3)',
					},
				},
			}}
		/>
	)
}
