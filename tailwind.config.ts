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
        templatePrimaryHeading: "var(--template-primary-heading)",
        templateSecondaryHeading: "var(--template-secondary-heading)",
        templatePrimaryText: "var(--template-primary-text)",
        templateSecondaryText: "var(--template-secondary-text)",
        templateWhite: "var(--template-white)",
        templateDark: "var(--template-dark)",
      },
    },
  },
  plugins: [],
};

export default config;
