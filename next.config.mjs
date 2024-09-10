/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/country',
        permanent: false
      }
    ]
  }
};

export default nextConfig;
