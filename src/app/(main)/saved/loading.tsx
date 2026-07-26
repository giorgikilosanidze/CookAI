import { RECIPES_PER_PAGE } from "./constants";

// Streamed while the cookbook queries run. Mirrors SavedRecipesClient's
// container and grid so the real cards drop straight in without a shift.
export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-[1060px] flex-col gap-7 px-6 pb-[72px] pt-12">
      <div className="flex flex-col gap-1.5">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-cream-200" />
        <div className="h-5 w-24 animate-pulse rounded bg-cream-200" />
      </div>

      <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(258px,1fr))]">
        {Array.from({ length: RECIPES_PER_PAGE }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[18px] border border-line bg-surface"
          >
            <div className="h-[150px] animate-pulse bg-cream-200" />
            <div className="flex flex-col gap-2.5 p-4">
              <div className="h-5 w-4/5 animate-pulse rounded bg-cream-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-cream-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
