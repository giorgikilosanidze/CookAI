"use client";

import { useRef, useState, type KeyboardEvent } from "react";

type Props = {
  ingredients: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
};

export default function IngredientInput({
  ingredients,
  onAdd,
  onRemove,
}: Props) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = (raw: string) => {
    const value = raw.trim().replace(/,$/, "").trim();
    if (value) onAdd(value);
    setDraft("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit(draft);
    } else if (e.key === "Backspace" && draft === "" && ingredients.length) {
      onRemove(ingredients.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-sm font-bold text-ink">Ingredients</label>
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex min-h-[58px] flex-wrap items-center gap-2 rounded-[13px] border-[1.5px] border-line bg-white px-3.5 py-2.5 transition-[border-color,box-shadow] focus-within:border-terracotta focus-within:shadow-[0_0_0_4px_rgba(198,93,59,0.10)]"
      >
        {ingredients.map((ing, i) => (
          <span
            key={`${ing}-${i}`}
            className="inline-flex items-center gap-[7px] rounded-full bg-terracotta/10 py-[7px] pl-[13px] pr-2 text-sm font-semibold text-terracotta"
          >
            {ing}
            <button
              type="button"
              aria-label={`Remove ${ing}`}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(i);
              }}
              className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-terracotta/20 text-xs leading-none text-terracotta"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => {
            const val = e.target.value;
            if (val.includes(",")) {
              val.split(",").forEach((part) => commit(part));
            } else {
              setDraft(val);
            }
          }}
          onKeyDown={onKeyDown}
          placeholder={
            ingredients.length ? "Add another…" : "e.g. chicken, rice, onion, garlic"
          }
          className="min-w-[150px] flex-1 border-none bg-transparent px-0.5 py-1.5 text-base text-ink outline-none placeholder:text-faint"
        />
      </div>
      <span className="text-[13px] text-faint">
        Press Enter or comma to add each ingredient.
      </span>
    </div>
  );
}
