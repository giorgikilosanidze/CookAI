import type { Recipe } from "@/lib/types";

// A saved recipe is a Recipe with a stable id. Its `description` carries the
// short snippet shown on the grid card and in the modal lead.
export type SavedRecipe = Recipe & { id: number };

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

export const SAVED_RECIPES: SavedRecipe[] = [
  {
    id: 1,
    title: "Golden Chicken & Herb Rice Skillet",
    time: "35 min",
    servings: "Serves 4",
    description:
      "Juicy seared chicken thighs over garlicky rice, finished with fresh herbs.",
    ingredients: [
      { amount: "4", name: "bone-in chicken thighs" },
      { amount: "1½ cups", name: "long-grain white rice" },
      { amount: "1", name: "yellow onion, diced" },
      { amount: "4 cloves", name: "garlic, minced" },
      { amount: "3 cups", name: "chicken broth" },
      { amount: "2 tbsp", name: "olive oil" },
      { amount: "1 tsp", name: "smoked paprika" },
      { amount: "2 tbsp", name: "fresh parsley, chopped" },
    ],
    steps: [
      "Pat the chicken thighs dry and season both sides with salt, pepper, and smoked paprika.",
      "Heat the olive oil in a large skillet over medium-high. Sear the chicken skin-side down until golden, about 5 minutes per side, then remove.",
      "Lower the heat and cook the onion and garlic in the same pan until soft, 3–4 minutes.",
      "Stir in the rice to coat, pour in the broth, and bring to a gentle simmer.",
      "Nestle the chicken back in, cover, and cook on low for 18–20 minutes until tender.",
      "Rest 5 minutes, scatter with parsley, and serve.",
    ],
  },
  {
    id: 2,
    title: "Creamy Tomato & Basil Pasta",
    time: "25 min",
    servings: "Serves 3",
    description:
      "Silky tomato-cream sauce tossed through pasta with torn basil and parmesan.",
    ingredients: [
      { amount: "12 oz", name: "penne pasta" },
      { amount: "2 tbsp", name: "olive oil" },
      { amount: "3 cloves", name: "garlic, minced" },
      { amount: "1 can", name: "crushed tomatoes (14 oz)" },
      { amount: "½ cup", name: "heavy cream" },
      { amount: "½ cup", name: "parmesan, grated" },
      { amount: "1 handful", name: "fresh basil, torn" },
    ],
    steps: [
      "Cook the penne in salted boiling water until al dente, reserving ½ cup pasta water.",
      "Warm the olive oil over medium heat and soften the garlic for 1 minute.",
      "Add the crushed tomatoes and simmer for 8 minutes until slightly thickened.",
      "Stir in the cream and parmesan until smooth, loosening with pasta water.",
      "Toss in the pasta and basil, season, and serve with extra parmesan.",
    ],
  },
  {
    id: 3,
    title: "Spiced Chickpea & Spinach Curry",
    time: "30 min",
    servings: "Serves 4",
    description:
      "A cozy coconut-tomato curry with chickpeas and wilted spinach over rice.",
    ingredients: [
      { amount: "2 cans", name: "chickpeas, drained (15 oz)" },
      { amount: "1 tbsp", name: "coconut oil" },
      { amount: "1", name: "onion, diced" },
      { amount: "3 cloves", name: "garlic, minced" },
      { amount: "1 tbsp", name: "curry powder" },
      { amount: "1 can", name: "coconut milk (14 oz)" },
      { amount: "1 can", name: "diced tomatoes (14 oz)" },
      { amount: "3 cups", name: "fresh spinach" },
    ],
    steps: [
      "Heat the coconut oil and cook the onion until soft, about 4 minutes.",
      "Add the garlic and curry powder and stir until fragrant, 1 minute.",
      "Pour in the coconut milk and tomatoes, then add the chickpeas.",
      "Simmer uncovered for 12–15 minutes until thickened.",
      "Fold in the spinach until wilted, season, and serve over rice.",
    ],
  },
  {
    id: 4,
    title: "Lemon Garlic Butter Salmon",
    time: "20 min",
    servings: "Serves 2",
    description: "Flaky roasted salmon glazed in a bright lemon-garlic butter.",
    ingredients: [
      { amount: "2", name: "salmon fillets" },
      { amount: "2 tbsp", name: "butter, melted" },
      { amount: "2 cloves", name: "garlic, minced" },
      { amount: "1", name: "lemon, juiced" },
      { amount: "1 tbsp", name: "fresh dill, chopped" },
      { amount: "¼ tsp", name: "salt" },
    ],
    steps: [
      "Heat the oven to 400°F (200°C) and line a tray with parchment.",
      "Whisk the butter, garlic, and lemon juice, then spoon over the salmon.",
      "Roast for 12–14 minutes until the salmon flakes easily.",
      "Scatter with dill and serve with lemon wedges.",
    ],
  },
  {
    id: 5,
    title: "Crispy Tofu Stir-Fry with Broccoli",
    time: "25 min",
    servings: "Serves 3",
    description: "Golden tofu and crisp broccoli in a glossy ginger-soy sauce.",
    ingredients: [
      { amount: "14 oz", name: "firm tofu, cubed" },
      { amount: "2 tbsp", name: "cornstarch" },
      { amount: "3 tbsp", name: "soy sauce" },
      { amount: "1 tbsp", name: "sesame oil" },
      { amount: "1 tbsp", name: "fresh ginger, grated" },
      { amount: "3 cups", name: "broccoli florets" },
      { amount: "2", name: "green onions, sliced" },
    ],
    steps: [
      "Toss the tofu in cornstarch and pan-fry until golden on all sides, then set aside.",
      "Stir-fry the broccoli in sesame oil for 3 minutes until bright green.",
      "Add the ginger, soy sauce, and a teaspoon of honey and toss for 1 minute.",
      "Return the tofu, coat in the sauce, and finish with green onions.",
    ],
  },
  {
    id: 6,
    title: "Smoky Black Bean Tacos",
    time: "20 min",
    servings: "Serves 4",
    description:
      "Smoky mashed black beans piled into warm tortillas with a quick lime slaw.",
    ingredients: [
      { amount: "2 cans", name: "black beans, drained (15 oz)" },
      { amount: "1 tsp", name: "smoked paprika" },
      { amount: "1 tsp", name: "ground cumin" },
      { amount: "8", name: "corn tortillas" },
      { amount: "1 cup", name: "shredded cabbage" },
      { amount: "1", name: "lime, juiced" },
      { amount: "1", name: "avocado, sliced" },
    ],
    steps: [
      "Warm the beans with the paprika and cumin, mashing lightly, for 5 minutes.",
      "Toss the cabbage with lime juice and a pinch of salt for a quick slaw.",
      "Char the tortillas over a flame or in a dry pan.",
      "Fill with beans, slaw, avocado, and a scatter of cilantro.",
    ],
  },
];
