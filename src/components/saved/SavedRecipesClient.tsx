"use client";

import { useState } from "react";
import { SAVED_RECIPES, type SavedRecipe } from "@/lib/savedRecipes";
import SavedRecipeCard from "@/components/saved/SavedRecipeCard";
import RecipeModal from "@/components/saved/RecipeModal";
import EmptyState from "@/components/saved/EmptyState";

export default function SavedRecipesClient() {
  const [recipes, setRecipes] = useState<SavedRecipe[]>(SAVED_RECIPES);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setSelectedId((current) => (current === id ? null : current));
  };

  const count = recipes.length;
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
          {count === 1 ? "1 recipe" : `${count} recipes`}
        </span>
      </div>

      {/* Grid OR empty state, driven by the data */}
      {count === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(258px,1fr))]">
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
