import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const locales = ['en', 'ua'];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    // Rewrite /path/locale to /locale/path (internally)
    // This allows URLs like /problems/en to work as /en/problems
    return {
      beforeFiles: locales.flatMap((locale) => [
        // Root with locale suffix: /en -> /en (home)
        {
          source: `/${locale}`,
          destination: `/${locale}`,
        },
        // Path with locale suffix: /problems/en -> /en/problems
        {
          source: `/:path*/${locale}`,
          destination: `/${locale}/:path*`,
        },
      ]),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withNextIntl(nextConfig);
