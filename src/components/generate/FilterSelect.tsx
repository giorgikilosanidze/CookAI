'use client';

import { useEffect, useRef, useState } from 'react';
import ChevronDown from '@/components/icons/ChevronDown';

type Props = {
	label: string;
	value: string;
	options: string[];
	onChange: (value: string) => void;
};

export default function FilterSelect({ label, value, options, onChange }: Props) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onDown = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', onDown);
		return () => document.removeEventListener('mousedown', onDown);
	}, [open]);

	return (
		<div className="flex flex-[1_1_180px] flex-col gap-1.5 ">
			<label className="text-[13px] font-semibold text-muted">{label}</label>
			<div className="relative" ref={ref}>
				<button
					type="button"
					onClick={() => setOpen((o) => !o)}
					aria-haspopup="listbox"
					aria-expanded={open}
					className="flex cursor-pointer w-full items-center justify-between gap-2.5 rounded-[11px] border-[1.5px] border-line bg-white px-3.5 py-3 text-left text-[15px] font-medium text-ink transition-colors hover:border-muted/40 focus:border-terracotta focus:outline-none"
				>
					<span>{value}</span>
					<ChevronDown
						size={14}
						className={`text-faint transition-transform duration-200 ${
							open ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{open && (
					<div
						role="listbox"
						className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 flex origin-top animate-dropdown flex-col rounded-[13px] border border-line bg-surface p-1.5 shadow-[0_14px_32px_rgba(46,42,37,0.14)]"
					>
						{options.map((opt) => {
							const selected = opt === value;
							return (
								<button
									key={opt}
									type="button"
									role="option"
									aria-selected={selected}
									onClick={() => {
										onChange(opt);
										setOpen(false);
									}}
									className={`flex w-full cursor-pointer items-center justify-between rounded-[9px] px-3.5 py-2.75s text-left text-[15px] transition-colors ${
										selected
											? 'bg-terracotta/10 font-semibold text-terracotta'
											: 'font-medium text-body hover:bg-terracotta/10 hover:text-terracotta'
									}`}
								>
									<span>{opt}</span>
									{selected && (
										<span className="text-[13px] font-bold text-terracotta">
											✓
										</span>
									)}
								</button>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
