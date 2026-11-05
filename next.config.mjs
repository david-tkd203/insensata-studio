/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['node:sqlite', 'bcryptjs', 'mjml', 'mjml-core', 'htmlnano', 'cosmiconfig'],
};

export default nextConfig;
