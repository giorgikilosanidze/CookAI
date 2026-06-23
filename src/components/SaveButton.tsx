import Bookmark from "@/components/icons/Bookmark";
import Check from "@/components/icons/Check";

type Props = {
  variant: "floating" | "block";
  saved: boolean;
  onToggleSave: () => void;
};

export default function SaveButton({ variant, saved, onToggleSave }: Props) {
  const shape =
    variant === "floating"
      ? "rounded-full px-4 py-2.5 text-sm shadow-[0_4px_12px_rgba(46,42,37,0.18)]"
      : "rounded-[12px] px-6 py-[13px] text-base";

  if (saved) {
    return (
      <button
        type="button"
        onClick={onToggleSave}
        className={`inline-flex items-center gap-2 border-[1.5px] border-herb bg-herb/10 font-semibold text-herb ${shape}`}
      >
        <Check size={variant === "floating" ? 15 : 16} />
        {variant === "floating" ? "Saved" : "Saved ✓"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggleSave}
      className={
        variant === "floating"
          ? `inline-flex items-center gap-2 border-none bg-terracotta font-semibold text-white transition-colors hover:bg-terracotta/90 ${shape}`
          : `inline-flex items-center gap-2.5 border-[1.5px] border-terracotta bg-surface font-semibold text-terracotta transition-all hover:-translate-y-px hover:bg-terracotta hover:text-white hover:shadow-[0_6px_16px_rgba(198,93,59,0.32)] ${shape}`
      }
    >
      <Bookmark size={variant === "floating" ? 15 : 16} />
      Save Recipe
    </button>
  );
}
