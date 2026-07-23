// Input limits shared by the generator UI and the /api/generate route.
// The client enforces them for UX; the server re-enforces them for safety.
export const MAX_INGREDIENTS = 20;
export const MAX_INGREDIENT_LENGTH = 40;
export const MAX_TWEAK_LENGTH = 200;
export const MAX_AVOID_TITLES = 8;

// Ingredient-photo scans: the client downscales before upload, the server
// rejects anything bigger than this.
export const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
