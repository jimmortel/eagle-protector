/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Force le mode statique
  images: { unoptimized: true },
};

module.exports = nextConfig;
