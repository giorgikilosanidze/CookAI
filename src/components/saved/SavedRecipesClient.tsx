"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { SavedRecipe } from "@/lib/savedRecipes";
import SavedRecipeCard from "@/components/saved/SavedRecipeCard";
import RecipeModal from "@/components/saved/RecipeModal";
import EmptyState from "@/components/saved/EmptyState";
import Pagination from "@/components/saved/Pagination";

type Props = {
  recipes: SavedRecipe[];
  totalCount: number;
  page: number;
  totalPages: number;
};

export default function SavedRecipesClient({
  recipes,
  totalCount,
  page,
  totalPages,
}: Props) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  // Deletes re-fetch the current page from the server so the grid backfills
  // from later pages; isPending dims the grid while that refresh is in flight.
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    if (deletingId) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
      // 404 means it's already gone — refresh the grid either way. The server
      // redirects to the previous page if this one just became empty.
      if (res.ok || res.status === 404) {
        setSelectedId((current) => (current === id ? null : current));
        startTransition(() => router.refresh());
      }
    } catch {
      // network hiccup — keep the card so the user can retry
    } finally {
      setDeletingId(null);
    }
  };

  const selectedIndex = recipes.findIndex((r) => r.id === selectedId);
  const selected = selectedIndex >= 0 ? recipes[selectedIndex] : null;

  return (
    <div className="mx-auto flex w-full max-w-[1060px] flex-col gap-7 px-6 pb-[72px] pt-12">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-serif text-[clamp(2rem,5.5vw,2.625rem)] font-semibold leading-[1.05] tracking-[-0.015em]">
          Saved Recipes
        </h1>
        <span className="text-base text-muted">
          {totalCount === 1 ? "1 recipe" : `${totalCount} recipes`}
        </span>
      </div>

      {/* Grid OR empty state, driven by the data */}
      {totalCount === 0 ? (
        <EmptyState />
      ) : (
        <div
          className={`grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(258px,1fr))] transition-opacity ${
            isPending ? "opacity-60" : ""
          }`}
        >
          {recipes.map((recipe, index) => (
            <SavedRecipeCard
              key={recipe.id}
              recipe={recipe}
              index={index}
              onOpen={setSelectedId}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} />

      {/* Detail modal */}
      {selected && (
        <RecipeModal
          recipe={selected}
          index={selectedIndex}
          onClose={() => setSelectedId(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
