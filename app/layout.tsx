import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
// import FooterV1 from "@/components/Footers/FooterV1/FooterV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";

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
      <body
        className={`${geistSans.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <ColorPallete />
        <HeaderV1 />
        {children}
        <FooterV1 />
      </body>
    </html>
  );
}
