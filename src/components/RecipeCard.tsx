import type { Recipe } from "@/lib/types";
import RecipeDetails from "@/components/RecipeDetails";
import SaveButton from "@/components/SaveButton";

type Props = {
  recipe: Recipe;
  saved: boolean;
  onToggleSave: () => void;
};

export default function RecipeCard({ recipe, saved, onToggleSave }: Props) {
  return (
    <article className="relative animate-fade-up overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_10px_36px_rgba(46,42,37,0.09)]">
      {/* Dish photo placeholder */}
      <div className="relative flex h-50 items-center justify-center bg-[repeating-linear-gradient(135deg,#F0E3D3,#F0E3D3_13px,#EAD9C6_13px,#EAD9C6_26px)]">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
          dish photo
        </span>
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-55% to-surface/85" />
        <div className="absolute right-4 top-4">
          <SaveButton variant="floating" saved={saved} onToggleSave={onToggleSave} />
        </div>
      </div>

      <div className="px-8.5 pb-9 pt-7.5">
        <h2 className="font-serif text-display tracking-[-0.015em]">{recipe.title}</h2>

        <RecipeDetails recipe={recipe} />

        <div className="mt-7.5 flex justify-end border-t border-line pt-6">
          <SaveButton variant="block" saved={saved} onToggleSave={onToggleSave} />
        </div>
      </div>
    </article>
  );
}
