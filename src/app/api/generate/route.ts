import { NextResponse } from "next/server";
import { generateRecipe, isRecipe } from "@/lib/generateRecipe";
import {
  MAX_AVOID_TITLES,
  MAX_INGREDIENTS,
  MAX_INGREDIENT_LENGTH,
  MAX_TWEAK_LENGTH,
} from "@/lib/constants";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Tweak mode: adjust an existing recipe instead of generating a new one.
  const tweak =
    typeof body.tweak === "string"
      ? body.tweak.trim().slice(0, MAX_TWEAK_LENGTH)
      : "";

  if (tweak) {
    if (!isRecipe(body.baseRecipe)) {
      return NextResponse.json(
        { error: "A valid recipe to tweak is required." },
        { status: 400 },
      );
    }

    try {
      const outcome = await generateRecipe({
        ingredients: [],
        tweak,
        baseRecipe: body.baseRecipe,
      });
      if (!outcome.feasible) {
        return NextResponse.json({ error: outcome.reason }, { status: 422 });
      }
      return NextResponse.json({ recipe: outcome.recipe });
    } catch (err) {
      console.error("generate route error (tweak):", err);
      return NextResponse.json(
        { error: "Couldn't update the recipe right now. Please try again." },
        { status: 500 },
      );
    }
  }

  const ingredients = Array.isArray(body.ingredients)
    ? body.ingredients
        .map((x) => String(x).trim().slice(0, MAX_INGREDIENT_LENGTH))
        .filter(Boolean)
        .slice(0, MAX_INGREDIENTS)
    : [];

  if (ingredients.length === 0) {
    return NextResponse.json(
      { error: "Add at least one ingredient." },
      { status: 400 },
    );
  }

  const cuisine = typeof body.cuisine === "string" ? body.cuisine : undefined;
  const diet = typeof body.diet === "string" ? body.diet : undefined;
  const cookTime = typeof body.cookTime === "string" ? body.cookTime : undefined;
  const avoid = Array.isArray(body.avoid)
    ? body.avoid
        .map((x) => String(x).trim().slice(0, 120))
        .filter(Boolean)
        .slice(-MAX_AVOID_TITLES)
    : [];

  try {
    const outcome = await generateRecipe({ ingredients, cuisine, diet, cookTime, avoid });
    if (!outcome.feasible) {
      return NextResponse.json({ error: outcome.reason }, { status: 422 });
    }
    return NextResponse.json({ recipe: outcome.recipe });
  } catch (err) {
    console.error("generate route error:", err);
    return NextResponse.json(
      { error: "Couldn't generate a recipe right now. Please try again." },
      { status: 500 },
    );
  }
}
