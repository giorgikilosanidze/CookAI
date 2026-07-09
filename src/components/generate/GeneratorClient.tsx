'use client';

import { useEffect, useRef, useState } from 'react';
import IngredientInput from '@/components/generate/IngredientInput';
import FilterSelect from '@/components/generate/FilterSelect';
import GeneratingState from '@/components/generate/GeneratingState';
import RecipeTweaker from '@/components/generate/RecipeTweaker';
import RecipeCard from '@/components/RecipeCard';
import Refresh from '@/components/icons/Refresh';
import { CUISINES, DIETS, COOK_TIMES, STATUS_MESSAGES } from '@/components/generate/constants';
import { downscaleImage } from '@/components/generate/utils';
import { MAX_AVOID_TITLES, MAX_INGREDIENTS, MAX_INGREDIENT_LENGTH } from '@/lib/constants';
import type { Phase } from '@/components/generate/types';
import type { Recipe } from '@/lib/types';

type Props = {
	signedIn: boolean;
};

export default function GeneratorClient({ signedIn }: Props) {
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
	const [savedId, setSavedId] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [errorMsg, setErrorMsg] = useState('');
	const [tweaking, setTweaking] = useState(false);
	const [tweakError, setTweakError] = useState('');
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const abortRef = useRef<AbortController | null>(null);
	const imageAbortRef = useRef<AbortController | null>(null);
	// Titles the user passed on via "Try another" — sent so Gemini doesn't
	// serve a reworded repeat. Cleared when a fresh generation starts.
	const avoidRef = useRef<string[]>([]);

	const clearTimers = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = null;
	};

	useEffect(
		() => () => {
			clearTimers();
			abortRef.current?.abort();
			imageAbortRef.current?.abort();
		},
		[],
	);

	// Fetch a dish photo for a recipe. Resolves to a data URI, or null on
	// failure/cancel — callers decide what to show instead.
	const fetchImage = async (target: Recipe): Promise<string | null> => {
		imageAbortRef.current?.abort();
		const controller = new AbortController();
		imageAbortRef.current = controller;

		try {
			const res = await fetch('/api/recipe-image', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: target.title, description: target.description }),
				signal: controller.signal,
			});
			if (!res.ok) return null;
			const data = await res.json();
			return typeof data.image === 'string' ? data.image : null;
		} catch {
			return null;
		}
	};

	const addIngredient = (value: string) => {
		const trimmed = value.slice(0, MAX_INGREDIENT_LENGTH);
		setIngredients((prev) =>
			prev.length >= MAX_INGREDIENTS ||
			prev.some((x) => x.toLowerCase() === trimmed.toLowerCase())
				? prev
				: [...prev, trimmed],
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
		setSavedId(null);
		setErrorMsg('');
		setTweakError('');
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
				body: JSON.stringify({ ingredients, cuisine, diet, cookTime, avoid: avoidRef.current }),
				signal: controller.signal,
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data?.error ?? 'Something went wrong.');

			// Recipe is ready — generate its photo before revealing the card, so
			// the result never shows a placeholder that swaps to an image later.
			const next = data.recipe as Recipe;
			setRecipe(next);
			clearTimers();
			setStatusIndex(STATUS_MESSAGES.length - 1); // "Plating it up…"
			const image = await fetchImage(next);
			if (imageAbortRef.current?.signal.aborted) return; // cancelled mid-photo

			setImageUrl(image);
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

	// Persist (or remove) the current recipe for the signed-in user.
	const toggleSave = async () => {
		if (!recipe || saving) return;
		if (!signedIn) {
			window.location.assign('/signin');
			return;
		}

		setSaving(true);
		try {
			if (savedId) {
				const res = await fetch(`/api/recipes/${savedId}`, { method: 'DELETE' });
				if (res.ok || res.status === 404) {
					setSavedId(null);
					setSaved(false);
				}
			} else {
				// Ship a downscaled thumbnail, not the ~1 MB generated photo.
				let image: string | undefined;
				if (imageUrl) {
					try {
						image = await downscaleImage(imageUrl);
					} catch {
						image = undefined;
					}
				}
				const res = await fetch('/api/recipes', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ recipe, image }),
				});
				const data = await res.json();
				if (res.ok && typeof data.id === 'string') {
					setSavedId(data.id);
					setSaved(true);
				}
			}
		} catch {
			// leave the button state unchanged — the user can retry
		} finally {
			setSaving(false);
		}
	};

	// "Try another": remember the rejected title, then rerun the same request.
	const tryAnother = () => {
		if (!recipe) return;
		avoidRef.current = [...avoidRef.current, recipe.title].slice(-MAX_AVOID_TITLES);
		generate();
	};

	const cancel = () => {
		clearTimers();
		abortRef.current?.abort();
		imageAbortRef.current?.abort();
		setPhase('idle');
	};

	// Adjust the current recipe via the same endpoint's tweak mode; the card
	// stays visible while the update runs.
	const tweak = async (text: string) => {
		if (tweaking || !recipe) return;
		setTweakError('');
		setTweaking(true);

		const controller = new AbortController();
		abortRef.current = controller;

		try {
			const res = await fetch('/api/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ tweak: text, baseRecipe: recipe }),
				signal: controller.signal,
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data?.error ?? 'Something went wrong.');

			const next = data.recipe as Recipe;
			// A tweak that renames the dish (e.g. chicken → mushroom) needs a new
			// photo; the old one stays on screen until the replacement is ready.
			if (recipe && next.title !== recipe.title) {
				fetchImage(next).then((image) => {
					if (image) setImageUrl(image);
				});
			}
			setRecipe(next);
			// The dish changed, so any previous save no longer describes it.
			setSaved(false);
			setSavedId(null);
		} catch (err) {
			if (controller.signal.aborted) return;
			setTweakError(err instanceof Error ? err.message : 'Something went wrong.');
		} finally {
			if (!controller.signal.aborted) setTweaking(false);
			abortRef.current = null;
		}
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
					onClick={() => {
						avoidRef.current = [];
						generate();
					}}
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
				<>
					<RecipeCard
						recipe={recipe}
						imageUrl={imageUrl}
						saved={saved}
						onToggleSave={toggleSave}
					/>
					<RecipeTweaker onTweak={tweak} busy={tweaking} error={tweakError} />
					<button
						type="button"
						onClick={tryAnother}
						disabled={tweaking}
						className="mx-auto inline-flex cursor-pointer items-center gap-2 text-[15px] font-semibold text-subtle transition-colors hover:text-terracotta disabled:cursor-default disabled:opacity-60"
					>
						<Refresh size={16} />
						Not feeling it? Try another recipe
					</button>
				</>
			)}
		</div>
	);
}
