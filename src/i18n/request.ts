import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'
import { locales, defaultLocale, type Locale } from './config'

async function loadMessages(locale: string) {
  const [common, landing, auth, questions, knowledgeCheck, problems] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/landing.json`),
    import(`../messages/${locale}/auth.json`),
    import(`../messages/${locale}/questions.json`),
    import(`../messages/${locale}/knowledge-check.json`),
    import(`../messages/${locale}/problems.json`),
  ])

  return {
    ...common.default,
    ...landing.default,
    ...auth.default,
    ...questions.default,
    ...knowledgeCheck.default,
    ...problems.default,
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale as Locale)) {
    try {
      const headersList = await headers()
      const referer = headersList.get('referer') || ''
      const pathname =
        headersList.get('x-pathname') || new URL(referer || 'http://localhost').pathname

      const segments = pathname.split('/').filter(Boolean)

      const lastSegment = segments[segments.length - 1]
      if (lastSegment && locales.includes(lastSegment as Locale)) {
        locale = lastSegment
      } else if (segments[0] && locales.includes(segments[0] as Locale)) {
        locale = segments[0]
      }
    } catch {
      // Fallback silently
    }
  }

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale
  }

  return {
    locale,
    messages: await loadMessages(locale),
  }
})
