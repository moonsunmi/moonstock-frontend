/** @type {import('next').NextConfig} */

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
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    if (!backendUrl) {
      console.warn(
        '[WARN] NEXT_PUBLIC_BACKEND_URL is not defined. API rewrites will fail.'
      )
      return []
    }

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`
      }
    ]
  }
}

export default nextConfig
