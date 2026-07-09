'use client';

import { useState, type SubmitEvent } from 'react';
import Sparkle from '@/components/icons/Sparkle';
import { TWEAK_SUGGESTIONS } from '@/components/generate/constants';
import { MAX_TWEAK_LENGTH } from '@/lib/constants';

type Props = {
	onTweak: (text: string) => void;
	busy: boolean;
	error: string;
};

// Scoped follow-up under the result card: quick suggestion chips or a free-form
// request, sent through /api/generate's tweak mode to update the recipe in place.
export default function RecipeTweaker({ onTweak, busy, error }: Props) {
	const [draft, setDraft] = useState('');

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const text = draft.trim();
		if (!text || busy) return;
		onTweak(text);
		setDraft('');
	};

	return (
		<div className="flex animate-fade-up flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-6 shadow-[0_6px_24px_rgba(46,42,37,0.05)]">
			<div className="flex items-center gap-2 text-ink">
				<span className="text-terracotta">
					<Sparkle size={16} />
				</span>
				<span className="text-sm font-bold">Tweak this recipe</span>
			</div>

			<div className="flex flex-wrap gap-2">
				{TWEAK_SUGGESTIONS.map((suggestion) => (
					<button
						key={suggestion}
						type="button"
						disabled={busy}
						onClick={() => onTweak(suggestion)}
						className="cursor-pointer rounded-full bg-terracotta/10 px-3.5 py-1.75 text-sm font-semibold text-terracotta transition-colors hover:bg-terracotta/20 disabled:cursor-default disabled:opacity-60"
					>
						{suggestion}
					</button>
				))}
			</div>

			<form onSubmit={handleSubmit} className="flex flex-wrap gap-2.5">
				<input
					value={draft}
					onChange={(e) => setDraft(e.target.value)}
					maxLength={MAX_TWEAK_LENGTH}
					disabled={busy}
					placeholder="e.g. no oven, make it spicier, swap the rice…"
					className="min-w-50 flex-1 rounded-[11px] border-[1.5px] border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-faint focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(198,93,59,0.10)] disabled:opacity-60"
				/>
				<button
					type="submit"
					disabled={busy || !draft.trim()}
					className="cursor-pointer rounded-[11px] bg-terracotta px-5.5 py-3 text-[15px] font-semibold text-white shadow-cta transition-colors hover:bg-terracotta/90 disabled:cursor-default disabled:opacity-60"
				>
					{busy ? (
						<span className="inline-flex items-center gap-2">
							<span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
							Updating…
						</span>
					) : (
						'Update'
					)}
				</button>
			</form>

			{error && (
				<p role="alert" className="text-sm font-medium text-terracotta">
					{error}
				</p>
			)}
		</div>
	);
}
