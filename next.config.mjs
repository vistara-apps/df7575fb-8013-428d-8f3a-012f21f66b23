/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'via.placeholder.com'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  }
};

export default nextConfig;
