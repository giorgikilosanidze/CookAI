import { NextResponse } from "next/server";
import { detectIngredients } from "@/lib/detectIngredients";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { MAX_PHOTO_BYTES } from "@/lib/constants";

// Only formats browsers produce from the canvas downscale (plus png/webp for
// direct uploads) — Gemini accepts all three.
const DATA_URI_RE = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+={0,2})$/;

export async function POST(request: Request) {
  // Vision calls cost more Gemini quota than text — cap them harder.
  const limited = await rateLimit(`detect:${clientIp(request)}`, 8, 300_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many photo scans — give it a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const image = typeof body.image === "string" ? body.image : "";
  const match = DATA_URI_RE.exec(image);
  if (!match) {
    return NextResponse.json(
      { error: "Send a JPEG, PNG, or WebP image." },
      { status: 400 },
    );
  }

  const [, mimeType, base64] = match;
  // Approximate decoded size from the base64 length (4 chars ≈ 3 bytes).
  if ((base64.length * 3) / 4 > MAX_PHOTO_BYTES) {
    return NextResponse.json(
      { error: "That photo is too large — keep it under 4 MB." },
      { status: 413 },
    );
  }

  try {
    const outcome = await detectIngredients(base64, mimeType);
    if (!outcome.foodFound) {
      return NextResponse.json({ error: outcome.reason }, { status: 422 });
    }
    return NextResponse.json({ ingredients: outcome.ingredients });
  } catch (err) {
    console.error("detect-ingredients route error:", err);
    return NextResponse.json(
      { error: "Couldn't read that photo right now. Please try again." },
      { status: 500 },
    );
  }
}
