import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isRecipe } from "@/lib/generateRecipe";

// Downscaled thumbnails run ~60-100 KB; this cap allows the full-size photo
// as a fallback while blocking anything abusive.
const MAX_IMAGE_DATA_LENGTH = 1_500_000;

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
    typeof body.image === "string" &&
    body.image.startsWith("data:image/") &&
    body.image.length <= MAX_IMAGE_DATA_LENGTH
      ? body.image
      : null;

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
