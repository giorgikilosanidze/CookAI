import { PHOTO_JPEG_QUALITY, PHOTO_MAX_DIMENSION } from "@/components/generate/constants";
import { MAX_INGREDIENTS, MAX_INGREDIENT_LENGTH } from "@/lib/constants";

// Add one ingredient to the list, enforcing the shared length/count caps and
// skipping case-insensitive duplicates. Returns `prev` unchanged when the
// value can't be added — pure so callers can also build the next list
// synchronously (e.g. Enter-to-generate can't wait for a state update).
export function withIngredient(prev: string[], raw: string): string[] {
  const value = raw.slice(0, MAX_INGREDIENT_LENGTH);
  if (
    !value ||
    prev.length >= MAX_INGREDIENTS ||
    prev.some((x) => x.toLowerCase() === value.toLowerCase())
  ) {
    return prev;
  }
  return [...prev, value];
}

// Downscale a photo in the browser before upload: draws it onto a canvas
// capped at PHOTO_MAX_DIMENSION and re-exports it as JPEG, turning a
// multi-megabyte phone photo into a ~100-300 KB payload. Returns a data URI.
// Throws when the file can't be decoded as an image (e.g. HEIC on Chrome).
export async function downscalePhoto(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, PHOTO_MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable.");
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", PHOTO_JPEG_QUALITY);
  } finally {
    bitmap.close();
  }
}
