# Internationalization (i18n) Documentation

## Overview

This project uses `next-intl` for enterprise-grade internationalization with **Ukrainian (🇺🇦) as the default language**.

## Architecture

### Directory Structure

```
src/
├── i18n/
│   ├── config.ts          # Locale configuration
│   └── request.ts         # Server-side i18n setup
├── messages/
│   ├── uk.json           # Ukrainian translations (default)
│   └── en.json           # English translations
├── middleware.ts          # Locale routing middleware
└── app/
    ├── layout.tsx        # Root layout
    └── [locale]/         # Locale-specific routes
        ├── layout.tsx    # Locale layout with NextIntlClientProvider
        └── page.tsx      # Page components
```

## Supported Locales

- **Ukrainian (uk)** - Default 🇺🇦
- **English (en)** 🇺🇸

## Usage

### In Client Components

```typescript
'use client';

import { useTranslations } from 'next-intl';

export const MyComponent = () => {
  const t = useTranslations('namespace');
  
  return <h1>{t('key')}</h1>;
};
```

### In Server Components

```typescript
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('namespace');
  
  return <h1>{t('key')}</h1>;
}
```

### With Parameters

```typescript
// In JSON: "welcome": "Welcome, {name}!"
t('welcome', { name: 'John' })
```

### Nested Keys

```typescript
// In JSON: { "nav": { "links": { "home": "Home" } } }
t('nav.links.home')
```

## Adding Translations

1. Add keys to `src/messages/uk.json` and `src/messages/en.json`
2. Use the `useTranslations` hook with the namespace

```json
{
  "hero": {
    "title": "Welcome",
    "description": "Description text"
  }
}
```

```typescript
const t = useTranslations('hero');
t('title'); // "Welcome"
```

## Language Switcher

The `LanguageSwitcher` component allows users to change language:

```typescript
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';

// Use anywhere in your app
<LanguageSwitcher />
```

## Routing

URLs are automatically prefixed with locale:
- `/` → `/uk` (Ukrainian - default)
- `/about` → `/uk/about`
- `/en/about` → English version

The middleware handles locale detection and routing automatically.

## Configuration

### Adding a New Locale

1. Update `src/i18n/config.ts`:

```typescript
export const locales = ['uk', 'en', 'de'] as const;
export const localeNames = {
  uk: 'Українська',
  en: 'English',
  de: 'Deutsch',
};
```

2. Create `src/messages/de.json`

3. Restart the dev server

## Best Practices

✅ **DO:**
- Always use translation keys instead of hardcoded strings
- Group related translations under namespaces
- Use descriptive key names
- Keep translations in sync across all locale files

❌ **DON'T:**
- Mix hardcoded strings with translations
- Use overly generic keys like "text1", "text2"
- Forget to add translations to all locale files

## Type Safety

TypeScript will autocomplete translation keys:

```typescript
// TypeScript knows all available keys
t('nav.links.home'); // ✅ Autocomplete works
t('invalid.key');     // ❌ TypeScript error
```

## Performance

- Translations are loaded server-side
- Only active locale messages are sent to client
- Automatic code splitting per route
- Zero runtime overhead

## Testing

```typescript
import { NextIntlClientProvider } from 'next-intl';

const mockMessages = {
  nav: {
    home: 'Home',
  },
};

// Wrap component for testing
<NextIntlClientProvider messages={mockMessages} locale="uk">
  <MyComponent />
</NextIntlClientProvider>
```

## Migration Guide

### From Hardcoded Strings

Before:
```typescript
<h1>Welcome to Hack Frontend</h1>
```

After:
```typescript
const t = useTranslations('hero');
<h1>{t('welcome')}</h1>
```

### From Other i18n Libraries

next-intl is compatible with ICU MessageFormat, making migration straightforward.

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [ICU MessageFormat](https://formatjs.io/docs/core-concepts/icu-syntax/)
- [Project i18n Config](../src/i18n/config.ts)

## Support

For questions about internationalization, contact the development team.
