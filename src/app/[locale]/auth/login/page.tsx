'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FaCode } from 'react-icons/fa'
import { useLocale } from '@/common/hooks'
import { LoginForm, GoogleSignInButton } from '@/modules/auth'
import { Footer } from '@/components/Footer/Footer'

export default function LoginPage() {
	const t = useTranslations('auth.login')
	const tAuth = useTranslations('auth')
	const locale = useLocale()

	return (
		<>
			<main className="auth-page">
				<div className="auth-card">
					<div className="auth-card__header">
						<Link href={`/${locale}`} className="auth-card__logo">
							<FaCode />
							<span>Hack Frontend</span>
						</Link>
						<h1 className="auth-card__title">{t('welcome')}</h1>
						<p className="auth-card__subtitle">{tAuth('signInToAccount')}</p>
					</div>

					<div className="auth-card__content">
						<LoginForm />

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
						<Link href={`/auth/register/${locale}`}>{tAuth('signUp')}</Link>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}
