import { NextResponse } from "next/server";
import { generateRecipe, type GenerateInput } from "@/lib/generateRecipe";

export async function POST(request: Request) {
  let body: GenerateInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const ingredients = Array.isArray(body.ingredients)
    ? body.ingredients.map((x) => String(x).trim()).filter(Boolean)
    : [];

  if (ingredients.length === 0) {
    return NextResponse.json(
      { error: "Add at least one ingredient." },
      { status: 400 },
    );
  }

  try {
    const recipe = await generateRecipe({ ...body, ingredients });
    return NextResponse.json({ recipe });
  } catch (err) {
    console.error("generate route error:", err);
    return NextResponse.json(
      { error: "Couldn't generate a recipe right now. Please try again." },
      { status: 500 },
    );
  }
}
