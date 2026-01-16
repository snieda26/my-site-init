'use client'

import { useTranslations } from 'next-intl'
import { FcGoogle } from 'react-icons/fc'

interface GoogleSignInButtonProps {
	onClick?: () => void
}

export function GoogleSignInButton({ onClick }: GoogleSignInButtonProps) {
	const t = useTranslations('auth')

	const handleClick = () => {
		if (onClick) {
			onClick()
		} else {
			// TODO: Implement Google OAuth
			console.log('Google Sign In clicked')
		}
	}

	return (
		<button
			type="button"
			className="auth-card__google-btn"
			onClick={handleClick}
		>
			<FcGoogle size={20} />
			{t('googleSignIn')}
		</button>
	)
}
