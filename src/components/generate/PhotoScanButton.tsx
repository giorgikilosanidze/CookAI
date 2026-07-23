"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Camera from "@/components/icons/Camera";
import { downscalePhoto } from "@/components/generate/utils";

type Props = {
  disabled?: boolean;
  /** Detected ingredient names — the parent merges them into the chip list. */
  onDetected: (ingredients: string[]) => void;
};

export default function PhotoScanButton({ disabled, onDetected }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const scan = async (file: File) => {
    setBusy(true);
    setError("");
    try {
      let image: string;
      try {
        image = await downscalePhoto(file);
      } catch {
        throw new Error("Couldn't read that image — try a JPEG or PNG photo.");
      }

      const res = await fetch("/api/detect-ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");

      const ingredients = Array.isArray(data.ingredients)
        ? data.ingredients.filter((x: unknown): x is string => typeof x === "string")
        : [];
      if (ingredients.length === 0) {
        throw new Error("We couldn't spot any ingredients in that photo.");
      }
      onDetected(ingredients);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset so picking the same file again still fires a change event.
    e.target.value = "";
    if (file) scan(file);
  };

  return (
    <div className="flex flex-col items-start gap-1.5">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || busy}
        className="inline-flex cursor-pointer items-center gap-2 rounded-[11px] border-[1.5px] border-line bg-transparent px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:border-terracotta hover:text-terracotta disabled:cursor-default disabled:opacity-60 disabled:hover:border-line disabled:hover:text-muted"
      >
        {busy ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-terracotta/30 border-t-terracotta" />
            Scanning photo…
          </>
        ) : (
          <>
            <Camera size={16} />
            Scan ingredients from a photo
          </>
        )}
      </button>
      {error && <span className="text-[13px] font-medium text-terracotta">{error}</span>}
    </div>
  );
}
