import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RecipeDetails from "@/components/RecipeDetails";
import ShareButton from "@/components/recipe/ShareButton";
import ArrowRight from "@/components/icons/ArrowRight";
import { thumbGradient } from "@/lib/savedRecipes";
import { jsonLdScript } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/siteUrl";
import { getSavedRecipe, recipeJsonLd } from "./utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getSavedRecipe(id);
  if (!recipe) return { title: "Recipe not found" };

  const description =
    recipe.description || `${recipe.title} — an AI-generated recipe from CookAI.`;
  // Blob-hosted dish photo when the recipe has one, otherwise the generic
  // site banner.
  const ogImage = recipe.imageData
    ? { url: recipe.imageData, width: 1024, height: 1024, alt: recipe.title }
    : { url: "/og.jpg", width: 1200, height: 630, alt: "CookAI" };
  return {
    title: recipe.title,
    description,
    alternates: { canonical: `/recipe/${id}` },
    openGraph: {
      type: "article",
      siteName: "CookAI",
      url: `/recipe/${id}`,
      title: recipe.title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description,
      images: [ogImage.url],
    },
  };
}

// Public share page for a saved recipe — the ids are unguessable cuids, so
// a recipe is only reachable by someone its owner gave the link to.
export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const recipe = await getSavedRecipe(id);
  if (!recipe) notFound();

  return (
    <div className="mx-auto w-full max-w-190 px-6 pb-18 pt-13">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escaped, not plain JSON.stringify — the recipe fields are
          // user-controlled and would otherwise break out of this tag.
          __html: jsonLdScript(recipeJsonLd(recipe, `${SITE_URL}/recipe/${id}`)),
        }}
      />
      <article className="overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_10px_36px_rgba(46,42,37,0.09)]">
        {/* Dish photo — Blob-hosted, or the striped placeholder */}
        <div
          className="relative h-75 sm:h-95"
          style={recipe.imageData ? undefined : { background: thumbGradient(0) }}
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
            className={`absolute inset-0 bg-linear-to-b from-transparent ${
              recipe.imageData ? "from-75% to-surface/45" : "from-55% to-surface/85"
            }`}
          />
        </div>

        <div className="px-8.5 pb-9 pt-7.5">
          <h1 className="font-serif text-display tracking-[-0.015em]">
            {recipe.title}
          </h1>

          <RecipeDetails recipe={recipe} />

          <div className="mt-7.5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <ShareButton path={`/recipe/${recipe.id}`} />
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-[11px] bg-terracotta px-[18px] py-[11px] text-[15px] font-semibold text-white no-underline shadow-cta transition-colors hover:bg-terracotta/90"
            >
              Cook with your own ingredients
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
