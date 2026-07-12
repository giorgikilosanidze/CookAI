import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import GeneratorClient from "@/components/generate/GeneratorClient";

export const metadata: Metadata = {
  title: "AI Recipe Generator",
  description:
    "List the ingredients you have on hand and CookAI writes a complete recipe in seconds — with exact amounts, numbered steps, and a photo of the dish.",
  alternates: { canonical: "/generate" },
};

export default async function GeneratePage() {
  // Saving requires a session; the client redirects to /signin otherwise.
  const session = await auth();

  return <GeneratorClient signedIn={Boolean(session?.user)} />;
}
