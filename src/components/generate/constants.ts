export const CUISINES = [
  "Any",
  "Italian",
  "Mexican",
  "Indian",
  "Asian",
  "Mediterranean",
];
export const DIETS = ["None", "Vegetarian", "Vegan", "Gluten-free"];
export const COOK_TIMES = [
  "Any",
  "Under 15 min",
  "Under 30 min",
  "Under 60 min",
];

// Shimmer gradient classes for the loading skeleton blocks.
export const SHIMMER =
  "bg-[linear-gradient(90deg,#EFE6D8_25%,#F7F1E7_50%,#EFE6D8_75%)] bg-[length:200%_100%] animate-shimmer";

// Quick one-tap tweaks offered under a generated recipe.
export const TWEAK_SUGGESTIONS = [
	"Make it vegetarian",
	"Make it spicier",
	"Simpler steps",
	"Under 30 minutes",
];

// Ingredient-photo scans are downscaled in the browser before upload —
// detection only needs ~1024px, not a 10 MB phone photo.
export const PHOTO_MAX_DIMENSION = 1024;
export const PHOTO_JPEG_QUALITY = 0.8;

// Rotating status lines shown while a recipe is being generated.
export const STATUS_MESSAGES = [
  "Looking through your pantry…",
  "Finding flavor pairings…",
  "Balancing the seasoning…",
  "Writing up the steps…",
  "Plating it up…",
];
