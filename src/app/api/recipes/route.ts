import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isRecipe } from "@/lib/generateRecipe";
import { deleteRecipeImage, storeRecipeImage } from "@/lib/storeRecipeImage";
import { rateLimit } from "@/lib/rateLimit";
import { MAX_RECIPE_IMAGE_BYTES } from "@/lib/constants";

// The dish photo arrives as the JPEG data URI /api/recipe-image produced, and
// is uploaded here rather than at generation time. Accepting only inline JPEG
// bytes — never a URL — means a crafted request still can't make share pages
// embed content we don't host.
const RECIPE_IMAGE_RE = /^data:image\/jpeg;base64,([A-Za-z0-9+/]+={0,2})$/;

// Returns the raw base64 payload, or null when the value isn't a dish photo we
// could have produced.
function recipeImageBase64(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const base64 = RECIPE_IMAGE_RE.exec(value)?.[1];
  if (!base64) return null;
  // Approximate decoded size from the base64 length (4 chars ≈ 3 bytes).
  if ((base64.length * 3) / 4 > MAX_RECIPE_IMAGE_BYTES) return null;
  return base64;
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

  // A save writes a row and uploads a photo, so it's the one authenticated
  // route that costs storage. Keyed by user rather than IP — the session is
  // the real identity here, and generation is capped at 8/min anyway, so no
  // legitimate user reaches this.
  const limited = await rateLimit(`save:${session.user.id}`, 20, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many saves — give it a minute and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
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

  // Upload the photo only now that the recipe is being kept. A failure here
  // costs the user their photo, not their recipe, so it's logged and skipped
  // rather than failing the save.
  let image: string | null = null;
  const base64 = recipeImageBase64(body.image);
  if (base64) {
    try {
      image = await storeRecipeImage(`data:image/jpeg;base64,${base64}`, recipe.title);
    } catch (err) {
      console.error("recipes route error (image upload):", err);
    }
  }

  try {
    const saved = await prisma.savedRecipe.create({
      data: {
        userId: session.user.id,
        title: recipe.title.slice(0, 200),
        description: recipe.description.slice(0, 1000),
        time: recipe.time.slice(0, 50),
        servings: recipe.servings.slice(0, 50),
        // isRecipe caps how many of these there can be; trim each one to what
        // a real ingredient line or step needs before it's stored.
        ingredients: recipe.ingredients.map((i) => ({
          amount: i.amount.slice(0, 40),
          name: i.name.slice(0, 120),
        })),
        steps: recipe.steps.map((s) => s.slice(0, 600)),
        imageData: image,
      },
    });
    return NextResponse.json({ id: saved.id }, { status: 201 });
  } catch (err) {
    console.error("recipes route error (save):", err);
    // No row will point at the blob we just uploaded, so drop it rather than
    // leave storage holding an image nothing references.
    if (image) await deleteRecipeImage(image);
    return NextResponse.json(
      { error: "Couldn't save the recipe right now. Please try again." },
      { status: 500 },
    );
  }
}
