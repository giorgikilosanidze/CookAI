import type { Recipe } from "@/lib/types";
import RecipeDetails from "@/components/RecipeDetails";
import SaveButton from "@/components/SaveButton";

type Props = {
  recipe: Recipe;
  imageUrl?: string | null;
  saved: boolean;
  // Hides both save buttons when the viewer isn't signed in.
  canSave: boolean;
  onToggleSave: () => void;
};

export default function RecipeCard({ recipe, imageUrl, saved, canSave, onToggleSave }: Props) {
  return (
    <article className="relative animate-fade-up overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_10px_36px_rgba(46,42,37,0.09)]">
      {/* Dish photo — the striped block only shows if image generation failed */}
      <div className="relative flex h-70 items-center justify-center bg-[repeating-linear-gradient(135deg,#F0E3D3,#F0E3D3_13px,#EAD9C6_13px,#EAD9C6_26px)] sm:h-90">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- plain img keeps Blob URLs out of the image-optimizer quota
          <img
            src={imageUrl}
            alt={recipe.title}
            className="absolute inset-0 h-full w-full animate-fade-up object-cover"
          />
        ) : (
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
            dish photo
          </span>
        )}
        <div
          className={`absolute inset-0 bg-linear-to-b from-transparent ${
            imageUrl ? 'from-75% to-surface/45' : 'from-55% to-surface/85'
          }`}
        />
        {canSave && (
          <div className="absolute right-4 top-4">
            <SaveButton variant="floating" saved={saved} onToggleSave={onToggleSave} />
          </div>
        )}
      </div>

      <div className="px-8.5 pb-9 pt-7.5">
        <h2 className="font-serif text-display tracking-[-0.015em]">{recipe.title}</h2>

        <RecipeDetails recipe={recipe} />

        {canSave && (
          <div className="mt-7.5 flex justify-end border-t border-line pt-6">
            <SaveButton variant="block" saved={saved} onToggleSave={onToggleSave} />
          </div>
        )}
      </div>
    </article>
  );
}
