import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteRecipeImage } from "@/lib/storeRecipeImage";
import { recipeCacheTag } from "@/lib/savedRecipes";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { id } = await params;

  // Scoping by userId means you can only remove your own recipes. Looked up
  // first (rather than deleteMany) so we still have the photo's URL to clean
  // up once the row is gone.
  const recipe = await prisma.savedRecipe.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true, imageData: true },
  });

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found." }, { status: 404 });
  }

  await prisma.savedRecipe.delete({ where: { id: recipe.id } });

  // Without this the share page would keep serving the cached copy of a
  // recipe its owner just deleted. `expire: 0` rather than the "max" profile:
  // that one is stale-while-revalidate, which would hand the deleted recipe
  // to one more visitor before refreshing.
  revalidateTag(recipeCacheTag(recipe.id), { expire: 0 });

  // After the row, so a storage hiccup can't leave a recipe pointing at an
  // image that no longer exists. deleteRecipeImage swallows its own errors.
  if (recipe.imageData) await deleteRecipeImage(recipe.imageData);

  return NextResponse.json({ ok: true });
}
