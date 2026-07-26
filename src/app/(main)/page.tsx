import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import CtaBanner from "@/components/home/CtaBanner";
import { jsonLdScript } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/siteUrl";

// Structured data so search engines understand what CookAI is.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CookAI",
  url: SITE_URL,
  applicationCategory: "LifestyleApplication",
  description:
    "Tell CookAI what's in your kitchen and get a complete AI-generated recipe in seconds — exact amounts, clear steps, and a photo of the dish.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(JSON_LD) }}
      />
      <Hero />
      <HowItWorks />
      <CtaBanner />
    </>
  );
}
