import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "@/components/context";
import ColorPallete from "@/components/Pallete/ColorPallete";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ST Template V1",
  description: "ST Template Description V1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="/assets/scripts/translation.js"
          strategy="beforeInteractive"
        />
        {process.env.GOOGLE_TRANSLATION_CONFIG && (
          <Script
            src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        style={{ top: 0, position: "unset" }}
        className={`${geistSans.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <AppProvider>
          {" "}
          <ColorPallete />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
