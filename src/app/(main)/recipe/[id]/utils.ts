import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { SavedRecipe } from "@/lib/savedRecipes";
import type { Ingredient } from "@/lib/types";

// Shared by generateMetadata and the page — `cache` makes it one DB query.
export const getSavedRecipe = cache(
  async (id: string): Promise<SavedRecipe | null> => {
    const row = await prisma.savedRecipe.findUnique({ where: { id } });
    if (!row) return null;
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      time: row.time,
      servings: row.servings,
      ingredients: row.ingredients as unknown as Ingredient[],
      steps: row.steps as unknown as string[],
      imageData: row.imageData,
    };
  },
);

// schema.org Recipe structured data — makes shared recipes eligible for
// rich results in search.
export function recipeJsonLd(recipe: SavedRecipe, url: string) {
  const minutes = recipe.time.match(/\d+/)?.[0];
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    // Google's recipe rich results require an image.
    ...(recipe.imageData ? { image: recipe.imageData } : {}),
    recipeYield: recipe.servings,
    ...(minutes ? { totalTime: `PT${minutes}M` } : {}),
    recipeIngredient: recipe.ingredients.map((ing) =>
      `${ing.amount} ${ing.name}`.trim(),
    ),
    recipeInstructions: recipe.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
    url,
  };
}
