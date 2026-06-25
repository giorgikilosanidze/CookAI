'use client';

import { useEffect, useRef, useState } from 'react';
import IngredientInput from '@/components/generate/IngredientInput';
import FilterSelect from '@/components/generate/FilterSelect';
import GeneratingState from '@/components/generate/GeneratingState';
import RecipeCard from '@/components/RecipeCard';
import { CUISINES, DIETS, COOK_TIMES, STATUS_MESSAGES } from '@/components/generate/constants';
import type { Phase } from '@/components/generate/types';
import type { Recipe } from '@/lib/types';

export default function GeneratorClient() {
	const [ingredients, setIngredients] = useState<string[]>([
		'chicken',
		'rice',
		'onion',
		'garlic',
	]);
	const [cuisine, setCuisine] = useState('Any');
	const [diet, setDiet] = useState('None');
	const [cookTime, setCookTime] = useState('Any');

	const [phase, setPhase] = useState<Phase>('idle');
	const [statusIndex, setStatusIndex] = useState(0);
	const [saved, setSaved] = useState(false);
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [errorMsg, setErrorMsg] = useState('');

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const abortRef = useRef<AbortController | null>(null);

	const clearTimers = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = null;
	};

	useEffect(
		() => () => {
			clearTimers();
			abortRef.current?.abort();
		},
		[],
	);

	const addIngredient = (value: string) => {
		setIngredients((prev) =>
			prev.some((x) => x.toLowerCase() === value.toLowerCase()) ? prev : [...prev, value],
		);
	};

	const removeIngredient = (index: number) => {
		setIngredients((prev) => prev.filter((_, i) => i !== index));
	};

	// Call the Gemini-backed API, rotating status messages while it works.
	const generate = async () => {
		if (phase === 'loading') return;
		if (ingredients.length === 0) {
			setErrorMsg('Add at least one ingredient first.');
			setPhase('error');
			return;
		}

		clearTimers();
		setSaved(false);
		setErrorMsg('');
		setStatusIndex(0);
		setPhase('loading');

		intervalRef.current = setInterval(() => {
			setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
		}, 1200);

		const controller = new AbortController();
		abortRef.current = controller;

		try {
			const res = await fetch('/api/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ingredients, cuisine, diet, cookTime }),
				signal: controller.signal,
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data?.error ?? 'Something went wrong.');

			clearTimers();
			setRecipe(data.recipe as Recipe);
			setPhase('result');
		} catch (err) {
			if (controller.signal.aborted) return; // user cancelled — leave as idle
			clearTimers();
			setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
			setPhase('error');
		} finally {
			abortRef.current = null;
		}
	};

	const cancel = () => {
		clearTimers();
		abortRef.current?.abort();
		setPhase('idle');
	};

	const loading = phase === 'loading';

	return (
		<div className="mx-auto flex w-full max-w-190 flex-col gap-7 px-6 pb-18 pt-13">
			{/* Header */}
			<div className="flex flex-col gap-3 text-center">
				<span className="text-eyebrow uppercase text-terracotta">AI Recipe Generator</span>
				<h1 className="font-serif text-[clamp(2.125rem,6vw,2.875rem)] font-semibold leading-[1.05] tracking-[-0.015em]">
					What&rsquo;s in your kitchen?
				</h1>
				<p className="mx-auto max-w-[48ch] text-[17px] leading-[1.55] text-subtle">
					List the ingredients you&rsquo;ve got on hand and we&rsquo;ll turn them into
					something worth cooking tonight.
				</p>
			</div>

			{/* Form card */}
			<div className="relative flex flex-col gap-5.5 rounded-[20px] border border-line bg-surface p-7 shadow-[0_6px_24px_rgba(46,42,37,0.05)]">
				<IngredientInput
					ingredients={ingredients}
					onAdd={addIngredient}
					onRemove={removeIngredient}
				/>

				<div className="flex flex-col gap-3">
					<span className="text-overline uppercase text-faint">Refine — optional</span>
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
					className={`w-full cursor-pointer rounded-[13px] py-4.25 text-[17px] font-semibold text-white shadow-[0_4px_14px_rgba(198,93,59,0.30)] transition-colors ${
						loading
							? 'cursor-progress bg-terracotta/90'
							: 'bg-terracotta hover:bg-terracotta/90'
					}`}
				>
					{loading ? (
						<span className="inline-flex items-center gap-2.75">
							<span className="inline-block h-4.75 w-4.75 animate-spin rounded-full border-[2.5px] border-white/40 border-t-white" />
							Generating…
						</span>
					) : (
						'Generate Recipe'
					)}
				</button>

				{loading && (
					<div className="absolute inset-0 z-5 cursor-progress rounded-[20px] bg-cream/50" />
				)}
			</div>

			{/* Loading state */}
			{loading && (
				<GeneratingState statusText={STATUS_MESSAGES[statusIndex]} onCancel={cancel} />
			)}

			{/* Error */}
			{phase === 'error' && (
				<div className="flex flex-col items-center gap-3 rounded-[20px] border border-terracotta/30 bg-terracotta/5 p-7 text-center">
					<p className="text-[15px] font-medium text-terracotta">{errorMsg}</p>
					<button
						type="button"
						onClick={generate}
						className="rounded-[10px] bg-terracotta px-5 py-2.5 text-[15px] font-semibold text-white no-underline shadow-cta transition-colors hover:bg-terracotta/90 cursor-pointer"
					>
						Try again
					</button>
				</div>
			)}

			{/* Result */}
			{phase === 'result' && recipe && (
				<RecipeCard
					recipe={recipe}
					saved={saved}
					onToggleSave={() => setSaved((s) => !s)}
				/>
			)}
		</div>
	);
}
