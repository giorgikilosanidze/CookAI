import { NextResponse } from "next/server";
import { generateRecipeImage } from "@/lib/generateRecipeImage";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  // Image generation burns Cloudflare Workers AI credits — cap per client.
  const limited = rateLimit(`recipe-image:${clientIp(request)}`, 8, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests — give it a minute and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim().slice(0, 120) : "";
  const description =
    typeof body.description === "string"
      ? body.description.trim().slice(0, 300)
      : undefined;

  if (!title) {
    return NextResponse.json({ error: "A recipe title is required." }, { status: 400 });
  }

  try {
    const image = await generateRecipeImage(title, description);
    return NextResponse.json({ image });
  } catch (err) {
    console.error("recipe-image route error:", err);
    return NextResponse.json(
      { error: "Couldn't generate a dish photo right now." },
      { status: 500 },
    );
  }
}
