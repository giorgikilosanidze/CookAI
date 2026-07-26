import "server-only";
import { del, put } from "@vercel/blob";

// All Vercel Blob access lives here. Blobs are written only when a recipe is
// saved and removed when it's deleted, so storage mirrors the SavedRecipe
// table one-for-one instead of growing with every generated photo.

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

// Removes a saved recipe's dish photo. Every upload gets a random suffix, so
// no two recipes share a blob and deleting one can never break another card.
// Never throws: the database row is already gone by the time this runs, and a
// leftover blob is a smaller problem than a delete that reports failure.
export async function deleteRecipeImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (err) {
    console.error("failed to delete recipe image blob:", err);
  }
}
