import "server-only";
import { put } from "@vercel/blob";

// Uploads a generated dish photo (JPEG data URI) to Vercel Blob and returns
// its public URL. Throws on failure/misconfig — Blob is a required part of
// the image pipeline (the SDK reads BLOB_READ_WRITE_TOKEN, or the OIDC pair
// on Vercel).
export async function storeRecipeImage(
  dataUri: string,
  title: string,
): Promise<string> {
  const base64 = dataUri.replace(/^data:image\/\w+;base64,/, "");
  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || "recipe";

  const { url } = await put(
    `recipes/${slug}.jpg`,
    Buffer.from(base64, "base64"),
    {
      access: "public",
      contentType: "image/jpeg",
      // Unguessable suffix — same privacy model as the cuid share links.
      addRandomSuffix: true,
    },
  );
  return url;
}
