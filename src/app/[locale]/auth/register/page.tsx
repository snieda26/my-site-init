'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FaCode } from 'react-icons/fa'
import { useLocale } from '@/common/hooks'
import { AnimatedBackground } from '@/components/Landing'
import { RegisterForm, GoogleSignInButton } from '@/modules/auth'

export default function RegisterPage() {
	const t = useTranslations('auth.register')
	const tAuth = useTranslations('auth')
	const locale = useLocale()
	const searchParams = useSearchParams()
	const returnTo = searchParams.get('returnTo')

	return (
		<>
			<AnimatedBackground />
			<main className="auth-page">
				<div className="auth-card">
					<div className="auth-card__header">
						<Link href={`/${locale}`} className="auth-card__logo">
							<FaCode />
							<span>ITLead</span>
						</Link>
						<h1 className="auth-card__title">{t('createAccount')}</h1>
						<p className="auth-card__subtitle">{tAuth('createNewAccount')}</p>
					</div>

					<div className="auth-card__content">
						<RegisterForm redirectTo={returnTo || undefined} />

						<div className="auth-card__divider">
							<span className="auth-card__divider-line" />
							<span className="auth-card__divider-text">{t('or')}</span>
							<span className="auth-card__divider-line" />
						</div>

						<div className="auth-card__social">
							<GoogleSignInButton />
						</div>
					</div>

				<div className="auth-card__footer">
					{t('haveAccount')}
					<Link href={returnTo ? `/auth/login/${locale}?returnTo=${encodeURIComponent(returnTo)}` : `/auth/login/${locale}`}>{tAuth('signIn')}</Link>
				</div>
				</div>
			</main>
		</>
	)
}
