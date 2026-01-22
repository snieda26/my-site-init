import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Poppins, Inter } from 'next/font/google'
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

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800', '900'],
	display: 'swap',
	variable: '--font-inter',
})

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
	title: 'ITLead — Platform for Frontend Interview Preparation',
	description:
		'Prepare for frontend interviews with 200+ articles, coding problems, quizzes, and flashcards. All questions from real interviews at top tech companies.',
	keywords:
		'frontend interview preparation, frontend interview questions, javascript interview, react interview questions, typescript interview',
	authors: [{ name: 'ITLead' }],
	openGraph: {
		title: 'ITLead — Platform for Frontend Interview Preparation',
		description:
			'Prepare for frontend interviews with 200+ articles, coding problems, quizzes, and flashcards.',
		url: 'https://www.itlead.com',
		siteName: 'ITLead',
		locale: 'ua_UA',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'ITLead — Platform for Frontend Interview Preparation',
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

	// Enable static rendering by setting the locale for server components
	setRequestLocale(locale)

	// Providing all messages to the client side - pass locale explicitly
	const messages = await getMessages({ locale })

	return (
		<html lang={locale} className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
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
				<NextIntlClientProvider locale={locale} messages={messages}>
					<AppProviders>{children}</AppProviders>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
