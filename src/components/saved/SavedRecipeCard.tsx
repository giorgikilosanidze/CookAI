import type { KeyboardEvent } from "react";
import type { SavedRecipe } from "@/lib/savedRecipes";
import { thumbGradient } from "@/lib/savedRecipes";
import { Trash } from "@/components/Icons";
import RecipeMeta from "@/components/RecipeMeta";

type Props = {
  recipe: SavedRecipe;
  index: number;
  onOpen: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function SavedRecipeCard({
  recipe,
  index,
  onOpen,
  onDelete,
}: Props) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(recipe.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(recipe.id)}
      onKeyDown={onKeyDown}
      className="group relative cursor-pointer overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_4px_16px_rgba(46,42,37,0.06)] transition-[transform,box-shadow] duration-150 hover:-translate-y-[3px] hover:shadow-[0_14px_34px_rgba(46,42,37,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
    >
      {/* Thumbnail */}
      <div
        className="relative h-[148px]"
        style={{ background: thumbGradient(index) }}
      >
        <span className="absolute bottom-3 left-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-faint opacity-55 transition-opacity group-hover:opacity-85">
          dish photo
        </span>
        <button
          type="button"
          title="Delete recipe"
          aria-label={`Delete ${recipe.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(recipe.id);
          }}
          className="absolute right-[11px] top-[11px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-surface/90 text-muted shadow-[0_2px_8px_rgba(46,42,37,0.14)] transition-colors hover:bg-terracotta hover:text-white"
        >
          <Trash size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2.5 px-[18px] pb-5 pt-[18px]">
        <h2 className="line-clamp-2 font-serif text-[21px] font-semibold leading-[1.18] tracking-[-0.01em]">
          {recipe.title}
        </h2>
        <RecipeMeta time={recipe.time} servings={recipe.servings} compact />
        <p className="line-clamp-2 text-sm leading-[1.5] text-muted">
          {recipe.description}
        </p>
      </div>
    </div>
  );
}
