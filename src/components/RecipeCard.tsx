import type { Recipe } from '@/lib/types';
import { Bookmark, Check } from '@/components/Icons';
import RecipeDetails from '@/components/RecipeDetails';

type Props = {
	recipe: Recipe;
	saved: boolean;
	onToggleSave: () => void;
};

function SaveButton({
	variant,
	saved,
	onToggleSave,
}: {
	variant: 'floating' | 'block';
	saved: boolean;
	onToggleSave: () => void;
}) {
	const shape =
		variant === 'floating'
			? 'rounded-full px-4 py-2.5 text-sm shadow-[0_4px_12px_rgba(46,42,37,0.18)]'
			: 'rounded-[12px] px-6 py-[13px] text-base';

	if (saved) {
		return (
			<button
				type="button"
				onClick={onToggleSave}
				className={`inline-flex items-center gap-2 border-[1.5px] border-herb bg-herb/10 font-semibold text-herb ${shape}`}
			>
				<Check size={variant === 'floating' ? 15 : 16} />
				{variant === 'floating' ? 'Saved' : 'Saved ✓'}
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={onToggleSave}
			className={
				variant === 'floating'
					? `inline-flex items-center gap-2 border-none bg-terracotta font-semibold text-white transition-colors hover:bg-terracotta/90 ${shape}`
					: `inline-flex items-center gap-2.5 border-[1.5px] border-terracotta bg-surface font-semibold text-terracotta transition-all hover:-translate-y-px hover:bg-terracotta hover:text-white hover:shadow-[0_6px_16px_rgba(198,93,59,0.32)] ${shape}`
			}
		>
			<Bookmark size={variant === 'floating' ? 15 : 16} />
			Save Recipe
		</button>
	);
}

export default function RecipeCard({ recipe, saved, onToggleSave }: Props) {
	return (
		<article className="relative animate-fade-up overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_10px_36px_rgba(46,42,37,0.09)]">
			{/* Dish photo placeholder */}
			<div className="relative flex h-50 items-center justify-center bg-[repeating-linear-gradient(135deg,#F0E3D3,#F0E3D3_13px,#EAD9C6_13px,#EAD9C6_26px)]">
				<span className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
					dish photo
				</span>
				<div className="absolute inset-0 bg-linear-to-b from-transparent from-55% to-surface/85" />
				<div className="absolute right-4 top-4">
					<SaveButton variant="floating" saved={saved} onToggleSave={onToggleSave} />
				</div>
			</div>

			<div className="px-8.5 pb-9 pt-7.5">
				<h2 className="font-serif text-display tracking-[-0.015em]">{recipe.title}</h2>

				<RecipeDetails recipe={recipe} />

				<div className="mt-7.5 flex justify-end border-t border-line pt-6">
					<SaveButton variant="block" saved={saved} onToggleSave={onToggleSave} />
				</div>
			</div>
		</article>
	);
}
