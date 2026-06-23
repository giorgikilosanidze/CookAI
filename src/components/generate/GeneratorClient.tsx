"use client";

import { useEffect, useRef, useState } from "react";
import IngredientInput from "@/components/generate/IngredientInput";
import FilterSelect from "@/components/generate/FilterSelect";
import GeneratingState from "@/components/generate/GeneratingState";
import RecipeCard from "@/components/RecipeCard";
import { MOCK_RECIPE, STATUS_MESSAGES } from "@/lib/mockRecipe";

const CUISINES = ["Any", "Italian", "Mexican", "Indian", "Japanese", "Mediterranean"];
const DIETS = ["None", "Vegetarian", "Vegan", "Gluten-free"];
const COOK_TIMES = ["Any", "Under 15 min", "Under 30 min", "Under 60 min"];

type Phase = "idle" | "loading" | "result";

export default function GeneratorClient() {
  const [ingredients, setIngredients] = useState<string[]>([
    "chicken",
    "rice",
    "onion",
    "garlic",
  ]);
  const [cuisine, setCuisine] = useState("Any");
  const [diet, setDiet] = useState("None");
  const [cookTime, setCookTime] = useState("Any");

  const [phase, setPhase] = useState<Phase>("idle");
  const [statusIndex, setStatusIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  };

  useEffect(() => clearTimers, []);

  const addIngredient = (value: string) => {
    setIngredients((prev) =>
      prev.some((x) => x.toLowerCase() === value.toLowerCase())
        ? prev
        : [...prev, value],
    );
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Mock generate flow: show loading, rotate status messages, then reveal result.
  const generate = () => {
    if (phase === "loading") return;
    clearTimers();
    setSaved(false);
    setStatusIndex(0);
    setPhase("loading");

    intervalRef.current = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 1200);

    timeoutRef.current = setTimeout(() => {
      clearTimers();
      setPhase("result");
    }, 3200);
  };

  const cancel = () => {
    clearTimers();
    setPhase("idle");
  };

  const loading = phase === "loading";

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-7 px-6 pb-[72px] pt-[52px]">
      {/* Header */}
      <div className="flex flex-col gap-3 text-center">
        <span className="text-eyebrow uppercase text-terracotta">
          AI Recipe Generator
        </span>
        <h1 className="font-serif text-[clamp(2.125rem,6vw,2.875rem)] font-semibold leading-[1.05] tracking-[-0.015em]">
          What&rsquo;s in your kitchen?
        </h1>
        <p className="mx-auto max-w-[48ch] text-[17px] leading-[1.55] text-subtle">
          List the ingredients you&rsquo;ve got on hand and we&rsquo;ll turn
          them into something worth cooking tonight.
        </p>
      </div>

      {/* Form card */}
      <div className="relative flex flex-col gap-[22px] rounded-[20px] border border-line bg-surface p-7 shadow-[0_6px_24px_rgba(46,42,37,0.05)]">
        <IngredientInput
          ingredients={ingredients}
          onAdd={addIngredient}
          onRemove={removeIngredient}
        />

        <div className="flex flex-col gap-3">
          <span className="text-overline uppercase text-faint">
            Refine — optional
          </span>
          <div className="flex flex-wrap gap-3.5">
            <FilterSelect
              label="Cuisine"
              value={cuisine}
              options={CUISINES}
              onChange={setCuisine}
            />
            <FilterSelect
              label="Dietary"
              value={diet}
              options={DIETS}
              onChange={setDiet}
            />
            <FilterSelect
              label="Cook time"
              value={cookTime}
              options={COOK_TIMES}
              onChange={setCookTime}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={generate}
          disabled={loading}
          className={`w-full rounded-[13px] py-[17px] text-[17px] font-semibold text-white shadow-[0_4px_14px_rgba(198,93,59,0.30)] transition-colors ${
            loading
              ? "cursor-progress bg-terracotta/90"
              : "bg-terracotta hover:bg-terracotta/90"
          }`}
        >
          {loading ? (
            <span className="inline-flex items-center gap-[11px]">
              <span className="inline-block h-[19px] w-[19px] animate-spin rounded-full border-[2.5px] border-white/40 border-t-white" />
              Generating…
            </span>
          ) : (
            "Generate Recipe"
          )}
        </button>

        {loading && (
          <div className="absolute inset-0 z-[5] cursor-progress rounded-[20px] bg-cream/50" />
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <GeneratingState
          statusText={STATUS_MESSAGES[statusIndex]}
          onCancel={cancel}
        />
      )}

      {/* Result */}
      {phase === "result" && (
        <RecipeCard
          recipe={MOCK_RECIPE}
          saved={saved}
          onToggleSave={() => setSaved((s) => !s)}
        />
      )}
    </div>
  );
}
