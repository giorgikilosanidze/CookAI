import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";

// Body — Hanken Grotesk (400 / 500 / 600 / 700)
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Display — Newsreader (serif, optical sizing on)
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CookAI",
  description:
    "Tell us what's in your kitchen — CookAI turns it into something worth making.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${newsreader.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
