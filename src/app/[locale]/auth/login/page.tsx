'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FaCode } from 'react-icons/fa'
import { useLocale } from '@/common/hooks'
import { AnimatedBackground } from '@/components/Landing'
import { LoginForm, GoogleSignInButton } from '@/modules/auth'

export default function LoginPage() {
	const t = useTranslations('auth.login')
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
						<h1 className="auth-card__title">{t('welcome')}</h1>
						<p className="auth-card__subtitle">{tAuth('signInToAccount')}</p>
					</div>

					<div className="auth-card__content">
						<LoginForm redirectTo={returnTo || undefined} />

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
					{t('noAccount')}
					<Link href={returnTo ? `/auth/register/${locale}?returnTo=${encodeURIComponent(returnTo)}` : `/auth/register/${locale}`}>{tAuth('signUp')}</Link>
				</div>
				</div>
			</main>
		</>
	)
}
