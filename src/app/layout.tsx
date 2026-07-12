import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import { SITE_URL } from "@/lib/siteUrl";
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

const DESCRIPTION =
  "Tell CookAI what's in your kitchen and get a complete AI-generated recipe in seconds — exact amounts, clear steps, and a photo of the dish.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CookAI — Turn your ingredients into recipes with AI",
    template: "%s · CookAI",
  },
  description: DESCRIPTION,
  applicationName: "CookAI",
  keywords: [
    "AI recipe generator",
    "recipe from ingredients",
    "what to cook",
    "cooking ideas",
    "meal ideas",
  ],
  openGraph: {
    type: "website",
    siteName: "CookAI",
    url: "/",
    title: "CookAI — Turn your ingredients into recipes with AI",
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "CookAI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CookAI — Turn your ingredients into recipes with AI",
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
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
