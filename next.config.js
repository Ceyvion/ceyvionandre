/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  assetPrefix: '/ceyvionandre/',
  basePath: '/ceyvionandre',
}

module.exports = nextConfig
