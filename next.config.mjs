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
  reactStrictMode: true,
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
    AFTERSHIP_API_KEY: process.env.AFTERSHIP_API_KEY,
    GOOGLE_TRANSLATION_CONFIG: JSON.stringify({
      languages: [
        { title: "English", name: "en" },
        { title: "Deutsch (German)", name: "de" },
        { title: "Español (Spanish)", name: "es" },
        { title: "Français (French)", name: "fr" },
        { title: "中文 (Chinese)", name: "zh" },
        { title: "हिन्दी (Hindi)", name: "hi" },
        { title: "日本語 (Japanese)", name: "ja" },
        { title: "Русский (Russian)", name: "ru" },
        { title: "Português (Portuguese)", name: "pt" },
        { title: "Italiano (Italian)", name: "it" },
        { title: "한국어 (Korean)", name: "ko" },
        { title: "العربية (Arabic)", name: "ar" },
        { title: "Türkçe (Turkish)", name: "tr" },
        { title: "ไทย (Thai)", name: "th" },
        { title: "Nederlands (Dutch)", name: "nl" },
        { title: "Polski (Polish)", name: "pl" },
        { title: "Svenska (Swedish)", name: "sv" },
        { title: "Ελληνικά (Greek)", name: "el" },
      ],
      defaultLanguage: "en",
    }),
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
