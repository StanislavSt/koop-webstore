/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL,
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
}

module.exports = nextConfig
