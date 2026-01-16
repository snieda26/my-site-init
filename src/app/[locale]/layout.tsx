import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Poppins } from 'next/font/google'
import { AppProviders } from '@/providers/app-providers'
import { locales, type Locale } from '@/i18n/config'
import '@/styles/globals.scss'
import '@/styles/components/index.scss'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-poppins',
})

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
	title: 'Hack Frontend — Platform for Frontend Interview Preparation',
	description:
		'Prepare for frontend interviews with 200+ articles, coding problems, quizzes, and flashcards. All questions from real interviews at top tech companies.',
	keywords:
		'frontend interview preparation, frontend interview questions, javascript interview, react interview questions, typescript interview',
	authors: [{ name: 'Hack Frontend' }],
	openGraph: {
		title: 'Hack Frontend — Platform for Frontend Interview Preparation',
		description:
			'Prepare for frontend interviews with 200+ articles, coding problems, quizzes, and flashcards.',
		url: 'https://www.hackfrontend.com',
		siteName: 'Hack Frontend',
		locale: 'ua_UA',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Hack Frontend — Platform for Frontend Interview Preparation',
		description:
			'Prepare for frontend interviews with 200+ articles, coding problems, quizzes, and flashcards.',
	},
	robots: {
		index: true,
		follow: true,
	},
}

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	// Ensure that the incoming `locale` is valid
	if (!locales.includes(locale as Locale)) {
		notFound()
	}

	// Providing all messages to the client side is the easiest way to get started
	const messages = await getMessages()

	return (
		<html lang={locale} className={poppins.variable} suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							try {
								const theme = localStorage.getItem('theme') || 'dark';
								document.documentElement.classList.toggle('dark', theme === 'dark');
								document.documentElement.setAttribute('data-theme', theme);
							} catch (e) {}
						`,
					}}
				/>
			</head>
			<body>
				<NextIntlClientProvider messages={messages}>
					<AppProviders>{children}</AppProviders>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
