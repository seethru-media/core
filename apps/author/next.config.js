/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@seethru/design-system', '@seethru/content-schema'],
};

module.exports = nextConfig;
