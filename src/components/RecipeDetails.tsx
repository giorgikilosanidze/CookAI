import type { Recipe } from "@/lib/types";
import RecipeMeta from "@/components/RecipeMeta";

// Shared recipe body: description + meta + ingredients/instructions columns.
// Reused by RecipeCard (generator) and RecipeModal (saved). The wrapping
// header/footer (photo + save vs. close + remove) stays with each parent.
export default function RecipeDetails({ recipe }: { recipe: Recipe }) {
  return (
    <>
      {recipe.description && (
        <p className="mt-3 max-w-[62ch] text-body leading-[1.55] text-subtle">
          {recipe.description}
        </p>
      )}

      <div className="mt-[18px]">
        <RecipeMeta time={recipe.time} servings={recipe.servings} />
      </div>

      <div className="my-6 h-px bg-line" />

      <div className="flex flex-wrap gap-10">
        {/* Ingredients */}
        <section className="min-w-[220px] flex-[1_1_240px]">
          <h3 className="mb-3.5 font-serif text-[21px] font-semibold">
            Ingredients
          </h3>
          <div className="flex flex-col">
            {recipe.ingredients.map((ing) => (
              <div
                key={ing.name}
                className="flex gap-3.5 border-b border-line py-[9px]"
              >
                <span className="w-[88px] flex-none text-[15px] font-semibold text-terracotta">
                  {ing.amount}
                </span>
                <span className="flex-1 text-[15px] leading-snug text-body">
                  {ing.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="min-w-[280px] flex-[2_1_340px]">
          <h3 className="mb-4 font-serif text-[21px] font-semibold">
            Instructions
          </h3>
          <div className="flex flex-col gap-[18px]">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-[15px]">
                <span className="mt-px flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-terracotta text-[15px] font-semibold text-white">
                  {i + 1}
                </span>
                <p className="flex-1 text-[15.5px] leading-[1.62] text-body">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
