/** @type {import('next').NextConfig} */

const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/studio/:path*'
      : '/studio/index.html',
}

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
    NEXT_PUBLIC_SHOPIFY_ADMIN_API_URL:
      process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_URL,
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
  i18n: {
    locales: ['en-US', 'bg'],
    defaultLocale: 'en-US',
  },
  async rewrites() {
    return [STUDIO_REWRITE]
  },
}

module.exports = nextConfig
