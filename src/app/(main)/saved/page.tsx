import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SavedRecipesClient from "@/components/saved/SavedRecipesClient";
import type { SavedRecipe } from "@/lib/savedRecipes";
import type { Ingredient } from "@/lib/types";

export const metadata: Metadata = {
  title: "Saved Recipes",
  // Per-user page behind auth — keep it out of search results.
  robots: { index: false, follow: false },
};

export default async function SavedPage() {
  // Saved recipes are per-user, so this page requires a session.
  const session = await auth();
  if (!session?.user) redirect("/signin");

  const rows = await prisma.savedRecipe.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const recipes: SavedRecipe[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    time: row.time,
    servings: row.servings,
    ingredients: row.ingredients as unknown as Ingredient[],
    steps: row.steps as unknown as string[],
    imageData: row.imageData,
  }));

  return <SavedRecipesClient initialRecipes={recipes} />;
}
