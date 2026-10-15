/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: pronto para Firebase Hosting sem servidor.
  output: 'export',
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
