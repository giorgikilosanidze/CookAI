import { Bowl, Clock } from "@/components/Icons";

type Props = {
  time: string;
  servings: string;
  compact?: boolean;
};

// Shared "⏱ time · 🍲 servings" row used by RecipeCard, the saved grid card, and the modal.
export default function RecipeMeta({ time, servings, compact = false }: Props) {
  const iconSize = compact ? 15 : 18;
  const text = compact ? "text-[13.5px]" : "text-[15px]";
  const gap = compact ? "gap-4" : "gap-[22px]";

  return (
    <div className={`flex flex-wrap ${gap} ${text} font-medium text-muted`}>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={iconSize} />
        {time}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Bowl size={iconSize} />
        {servings}
      </span>
    </div>
  );
}
