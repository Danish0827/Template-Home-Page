// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	env: {
// 	  BACKEND: process.env.BACKEND,
// 	  NEXT_PUBLIC_WORDPRESS_SITE_URL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
// 	  WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY,
// 	  WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET,
// 	},
//   };

//   export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND: process.env.BACKEND,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WORDPRESS_SITE_URL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY,
    WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  },
  //   webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //       // Exclude modules from client-side builds
  //       config.resolve.fallback = {
  //         ...config.resolve.fallback,
  //         fs: false,
  //         net: false,
  //         tls: false,
  //         dns: false,
  //       };
  //     }
  //     return config;
  //   },
};

export default nextConfig;
