// Input limits shared by the generator UI and the /api/generate route.
// The client enforces them for UX; the server re-enforces them for safety.
export const MAX_INGREDIENTS = 20;
export const MAX_INGREDIENT_LENGTH = 40;
export const MAX_TWEAK_LENGTH = 200;
export const MAX_AVOID_TITLES = 8;

// Ingredient-photo scans: the client downscales before upload, the server
// rejects anything bigger than this.
export const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

// Abuse ceilings for a recipe body, enforced by isRecipe. Saves accept a
// client-supplied recipe, so without these the ingredients/steps JSON columns
// would take arbitrarily large arrays. Set generously — no real recipe comes
// close, so a legitimate model response never trips them.
export const MAX_RECIPE_INGREDIENTS = 50;
export const MAX_RECIPE_STEPS = 40;
export const MAX_RECIPE_FIELD_LENGTH = 2000;

// Generated dish photos travel to the client as JPEG data URIs (~150-250 KB)
// and come back on save. The save route rejects anything larger before it
// reaches Blob storage.
export const MAX_RECIPE_IMAGE_BYTES = 2 * 1024 * 1024;
