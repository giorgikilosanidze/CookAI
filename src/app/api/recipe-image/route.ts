import { NextResponse } from "next/server";
import { generateRecipeImage } from "@/lib/generateRecipeImage";

export async function POST(request: Request) {
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
