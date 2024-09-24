import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        templatePrimary: "var(--template-primary)",
        templatePrimaryLight: "var(--template-primary-light)",
        templateSecondary: "var(--template-secondary)",
        templateSecondaryLight: "var(--template-secondary-light)",
        templateHeading: "var(--template-heading)",
        templateText: "var(--template-text)",
        templateGray: "var(--template-gray)",
        templateDark: "var(--template-dark)",
      },
    },
  },
  plugins: [],
};

export default config;
