const { config } = require('dotenv');

config({ path: '.env' });
config({ path: '.env.local', override: true });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false };
    return config;
  },
  env: {
    api: 'https://api.github.com',
    gh_token: process.env.GH_ACCESS_TOKEN,
    auto_load_userdata: process.env.AUTO_LOAD_USERDATA
  },
};

module.exports = nextConfig;
