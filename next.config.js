/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // 此配置与app目录下的generateStaticParams不兼容，已移除
  distDir: process.env.NODE_ENV === "production" ? "build" : ".next",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 移除exportPathMap配置，与app目录不兼容
  // exportPathMap: async function (defaultPathMap) {
  //   return defaultPathMap;
  // },
  // 排除API路由
  trailingSlash: true,
  // React 严格模式
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // 实验性功能
  experimental: {}
}

module.exports = nextConfig
