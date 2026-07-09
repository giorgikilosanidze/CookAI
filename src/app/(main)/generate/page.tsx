import { auth } from "@/lib/auth";
import GeneratorClient from "@/components/generate/GeneratorClient";

export default async function GeneratePage() {
  // Saving requires a session; the client redirects to /signin otherwise.
  const session = await auth();

  return <GeneratorClient signedIn={Boolean(session?.user)} />;
}
