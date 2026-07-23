"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { SavedRecipe } from "@/lib/savedRecipes";
import { thumbGradient } from "@/lib/savedRecipes";
import ArrowRight from "@/components/icons/ArrowRight";
import Close from "@/components/icons/Close";
import Trash from "@/components/icons/Trash";
import RecipeDetails from "@/components/RecipeDetails";
import ShareButton from "@/components/recipe/ShareButton";

type Props = {
  recipe: SavedRecipe;
  index: number;
  onClose: () => void;
  onDelete: (id: string) => void;
};

export default function RecipeModal({
  recipe,
  index,
  onClose,
  onDelete,
}: Props) {
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={recipe.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex animate-backdrop items-start justify-center overflow-auto bg-ink/50 px-5 py-10 backdrop-blur-[2px]"
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[720px] animate-modal overflow-hidden rounded-[22px] bg-surface shadow-[0_24px_60px_rgba(46,42,37,0.3)]"
      >
        {/* Header — stored photo, or the striped placeholder when none */}
        <div
          className="relative h-80"
          style={recipe.imageData ? undefined : { background: thumbGradient(index) }}
        >
          {recipe.imageData && (
            // eslint-disable-next-line @next/next/no-img-element -- plain img keeps Blob URLs out of the image-optimizer quota
            <img
              src={recipe.imageData}
              alt={recipe.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent ${
              recipe.imageData ? "from-75% to-surface/45" : "from-55% to-surface/85"
            }`}
          />
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-surface/95 text-subtle shadow-[0_2px_10px_rgba(46,42,37,0.18)] transition-colors hover:bg-terracotta hover:text-white"
          >
            <Close size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-[34px] pb-[34px] pt-7">
          <h2 className="font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.015em]">
            {recipe.title}
          </h2>

          <RecipeDetails recipe={recipe} />

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-[22px]">
            <div className="flex flex-wrap items-center gap-3">
              <ShareButton path={`/recipe/${recipe.id}`} />
              <Link
                href={`/recipe/${recipe.id}`}
                className="inline-flex items-center gap-2 rounded-[11px] border-[1.5px] border-line bg-transparent px-[18px] py-[11px] text-[15px] font-semibold text-muted no-underline transition-colors hover:border-terracotta hover:text-terracotta"
              >
                Open full page
                <ArrowRight size={15} />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => onDelete(recipe.id)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-[11px] border-[1.5px] border-line bg-transparent px-[18px] py-[11px] text-[15px] font-semibold text-muted transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <Trash size={15} />
              Remove from saved
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
