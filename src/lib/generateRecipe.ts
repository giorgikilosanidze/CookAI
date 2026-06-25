import "server-only";
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from "@/lib/types";

export type GenerateInput = {
  ingredients: string[];
  cuisine?: string;
  diet?: string;
  cookTime?: string;
};

// JSON shape we force Gemini to return — mirrors the `Recipe` type.
const RECIPE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    time: { type: Type.STRING, description: "Total time, e.g. '35 min'" },
    servings: { type: Type.STRING, description: "e.g. 'Serves 4'" },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          amount: { type: Type.STRING, description: "e.g. '2 tbsp', '1½ cups'" },
          name: { type: Type.STRING },
        },
        required: ["amount", "name"],
        propertyOrdering: ["amount", "name"],
      },
    },
    steps: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["title", "description", "time", "servings", "ingredients", "steps"],
  propertyOrdering: ["title", "description", "time", "servings", "ingredients", "steps"],
};

function buildPrompt({ ingredients, cuisine, diet, cookTime }: GenerateInput): string {
  const constraints = [
    cuisine && cuisine !== "Any" ? `Cuisine: ${cuisine}.` : "",
    diet && diet !== "None" ? `Dietary requirement: ${diet}.` : "",
    cookTime && cookTime !== "Any" ? `Target cook time: ${cookTime}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return [
    "You are a recipe developer. Create one appealing, realistic recipe that uses the ingredients the user has on hand.",
    `Ingredients available: ${ingredients.join(", ")}.`,
    "You may assume common pantry staples (salt, pepper, oil, water). Don't invent exotic ingredients the user didn't mention.",
    constraints,
    "Write clear, numbered-free step sentences (each array item is one step). Keep it concise and home-cook friendly.",
  ]
    .filter(Boolean)
    .join("\n");
}

// Calls Gemini Flash and returns a typed Recipe. Throws on failure/misconfig.
export async function generateRecipe(input: GenerateInput): Promise<Recipe> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "PASTE_YOUR_KEY_HERE") {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: buildPrompt(input),
    config: {
      responseMimeType: "application/json",
      responseSchema: RECIPE_SCHEMA,
      temperature: 0.9,
    },
  });

  const text = response.text;
  if (!text) throw new Error("Gemini returned an empty response.");

  return JSON.parse(text) as Recipe;
}
