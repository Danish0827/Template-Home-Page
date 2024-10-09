/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND: process.env.BACKEND,
    NEXT_PUBLIC_WORDPRESS_SITE_URL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY,
    WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET,
  },
};

export default nextConfig;
