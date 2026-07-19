import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isRecipe } from "@/lib/generateRecipe";

const MAX_IMAGE_URL_LENGTH = 500;

// Only photos we hosted ourselves — an arbitrary external URL would let a
// crafted request make share pages embed content we don't control.
function isBlobUrl(value: string): boolean {
  if (value.length > MAX_IMAGE_URL_LENGTH) return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".public.blob.vercel-storage.com")
    );
  } catch {
    return false;
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const recipes = await prisma.savedRecipe.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ recipes });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isRecipe(body.recipe)) {
    return NextResponse.json({ error: "A valid recipe is required." }, { status: 400 });
  }
  const recipe = body.recipe;

  const image =
    typeof body.image === "string" && isBlobUrl(body.image) ? body.image : null;

  try {
    const saved = await prisma.savedRecipe.create({
      data: {
        userId: session.user.id,
        title: recipe.title.slice(0, 200),
        description: recipe.description.slice(0, 1000),
        time: recipe.time.slice(0, 50),
        servings: recipe.servings.slice(0, 50),
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        imageData: image,
      },
    });
    return NextResponse.json({ id: saved.id }, { status: 201 });
  } catch (err) {
    console.error("recipes route error (save):", err);
    return NextResponse.json(
      { error: "Couldn't save the recipe right now. Please try again." },
      { status: 500 },
    );
  }
}
