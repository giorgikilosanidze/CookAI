import type { Recipe } from "@/lib/types";

// Placeholder recipe returned by the Generator's mock flow.
// Swap this out for a real AI/API response later.
export const MOCK_RECIPE: Recipe = {
  title: "Golden Chicken & Herb Rice Skillet",
  description:
    "A one-pan weeknight dinner — juicy seared chicken thighs over garlicky rice, finished with fresh herbs.",
  time: "35 min",
  servings: "Serves 4",
  ingredients: [
    { amount: "4", name: "bone-in chicken thighs" },
    { amount: "1½ cups", name: "long-grain white rice" },
    { amount: "1", name: "yellow onion, diced" },
    { amount: "4 cloves", name: "garlic, minced" },
    { amount: "3 cups", name: "chicken broth" },
    { amount: "2 tbsp", name: "olive oil" },
    { amount: "1 tsp", name: "smoked paprika" },
    { amount: "½ tsp", name: "salt" },
    { amount: "¼ tsp", name: "black pepper" },
    { amount: "2 tbsp", name: "fresh parsley, chopped" },
  ],
  steps: [
    "Pat the chicken thighs dry and season both sides with salt, pepper, and smoked paprika.",
    "Heat the olive oil in a large skillet over medium-high. Sear the chicken skin-side down until golden, about 5 minutes per side, then remove and set aside.",
    "Lower the heat to medium. Add the onion and garlic to the same pan and cook until soft and fragrant, 3–4 minutes.",
    "Stir in the rice to coat it in the oil, then pour in the chicken broth and bring to a gentle simmer.",
    "Nestle the chicken back into the rice, cover, and cook on low for 18–20 minutes until the rice is tender and the liquid is absorbed.",
    "Remove from heat and let rest 5 minutes. Scatter with fresh parsley and serve.",
  ],
};

export const STATUS_MESSAGES = [
  "Looking through your pantry…",
  "Finding flavor pairings…",
  "Balancing the seasoning…",
  "Writing up the steps…",
  "Plating it up…",
];
