import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SavedRecipesClient from "@/components/saved/SavedRecipesClient";
import { RECIPES_PER_PAGE } from "./constants";
import type { SavedRecipe } from "@/lib/savedRecipes";
import type { Ingredient } from "@/lib/types";

export const metadata: Metadata = {
  title: "Saved Recipes",
  // Per-user page behind auth — keep it out of search results.
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function SavedPage({ searchParams }: Props) {
  // Saved recipes are per-user, so this page requires a session.
  const session = await auth();
  if (!session?.user) redirect("/signin");

  const { page: pageParam } = await searchParams;
  const requested = Number(Array.isArray(pageParam) ? pageParam[0] : pageParam);
  const page = Number.isInteger(requested) && requested > 1 ? requested : 1;

  const where = { userId: session.user.id };

  // Both queries in one round trip rather than two. The redirect below only
  // fires on a stale page number, so in that rare case we discard rows we
  // already have — cheaper than serialising every normal page load.
  const [totalCount, rows] = await Promise.all([
    prisma.savedRecipe.count({ where }),
    prisma.savedRecipe.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * RECIPES_PER_PAGE,
      take: RECIPES_PER_PAGE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / RECIPES_PER_PAGE));

  // Past-the-end page (stale link, or the last recipe on it was deleted) —
  // send the user to the last page that still exists.
  if (page > totalPages) {
    redirect(totalPages === 1 ? "/saved" : `/saved?page=${totalPages}`);
  }

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

  return (
    <SavedRecipesClient
      recipes={recipes}
      totalCount={totalCount}
      page={page}
      totalPages={totalPages}
    />
  );
}
