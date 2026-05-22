/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Cette ligne ignore les erreurs TypeScript lors du build
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
