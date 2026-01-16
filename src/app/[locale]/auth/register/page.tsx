'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FaCode } from 'react-icons/fa'
import { RegisterForm, GoogleSignInButton } from '@/modules/auth'
import { Footer } from '@/components/Footer/Footer'

export default function RegisterPage() {
	const t = useTranslations('auth.register')
	const tAuth = useTranslations('auth')
	const params = useParams()
	const locale = params.locale as string

	return (
		<>
			<main className="auth-page">
				<div className="auth-card">
					<div className="auth-card__header">
						<Link href={`/${locale}`} className="auth-card__logo">
							<FaCode />
							<span>Hack Frontend</span>
						</Link>
						<h1 className="auth-card__title">{t('createAccount')}</h1>
						<p className="auth-card__subtitle">{tAuth('createNewAccount')}</p>
					</div>

					<div className="auth-card__content">
						<RegisterForm />

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
						<Link href={`/${locale}/auth/login`}>{tAuth('signIn')}</Link>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}
