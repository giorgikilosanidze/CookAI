import "server-only";

// Generates a dish photo with Cloudflare Workers AI (FLUX.1-schnell, free tier)
// and returns it as a data URI ready for an <img> src. Throws on failure/misconfig.
export async function generateRecipeImage(
  title: string,
  description?: string,
): Promise<string> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) {
    throw new Error(
      "CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN are not set. Add them to .env.local.",
    );
  }

  const prompt = [
    `Professional food photography of ${title}.`,
    description,
    "Overhead shot on a rustic ceramic plate, warm natural light, shallow depth of field, appetizing, no text or hands.",
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 2048);

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, steps: 6 }),
    },
  );

  if (!res.ok) {
    throw new Error(`Cloudflare Workers AI returned ${res.status}.`);
  }

  const data = (await res.json()) as {
    success?: boolean;
    result?: { image?: string };
  };

  const image = data.result?.image;
  if (!data.success || !image) {
    throw new Error("Cloudflare Workers AI returned no image.");
  }

  return `data:image/jpeg;base64,${image}`;
}
