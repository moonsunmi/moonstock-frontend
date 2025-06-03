/** @type {import('next').NextConfig} */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

if (process.env.NODE_ENV === 'production' && !BACKEND_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL is missing in production!')
}

const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://apis.data.go.kr/'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET'
          }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/:path*`
      }
    ]
  }
}

export default nextConfig
