import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { recipeCacheTag, type SavedRecipe } from "@/lib/savedRecipes";
import type { Ingredient } from "@/lib/types";

// Share pages are public and can be linked anywhere, so the row is cached
// across requests rather than re-read from Neon on every view. The layout
// calls auth(), which keeps this route dynamically rendered, so caching the
// query is what buys the saving — a route-level revalidate wouldn't apply.
// Deleting the recipe revalidates its tag; the hourly window is a backstop.
function readSavedRecipe(id: string): Promise<SavedRecipe | null> {
  return unstable_cache(
    async () => {
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
    ["saved-recipe", id],
    { tags: [recipeCacheTag(id)], revalidate: 3600 },
  )();
}

// Shared by generateMetadata and the page — `cache` collapses those two calls
// into one within a single request.
export const getSavedRecipe = cache(readSavedRecipe);

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
