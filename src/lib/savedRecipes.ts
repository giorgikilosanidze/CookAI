import type { Recipe } from "@/lib/types";

// A saved recipe as the client sees it: a Recipe with its database id and
// the stored thumbnail (JPEG data URI, null when the photo wasn't saved).
export type SavedRecipe = Recipe & { id: string; imageData: string | null };

// Decorative stripe palettes for the dish-photo placeholders, varied per card.
const STRIPES: [string, string][] = [
  ["#F0E3D3", "#EAD9C6"],
  ["#EDE6D2", "#E3DAC0"],
  ["#F1DFD6", "#E9D0C2"],
  ["#E8E2D2", "#DED7C2"],
  ["#F2E2D0", "#ECD6BE"],
  ["#EAE0D8", "#DFD3C7"],
];

export function thumbGradient(index: number): string {
  const [a, b] = STRIPES[index % STRIPES.length];
  return `repeating-linear-gradient(135deg, ${a}, ${a} 13px, ${b} 13px, ${b} 26px)`;
}
