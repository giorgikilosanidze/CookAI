import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react';

type Props = {
	id: string;
	name: string;
	label: string;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	hint?: string;
	autoComplete?: string;
	labelAccessory?: ReactNode;
};

export default function TextField({
	id,
	name,
	label,
	type = 'text',
	placeholder,
	value,
	onChange,
	error,
	hint,
	autoComplete,
	labelAccessory,
}: Props) {
	const invalid = Boolean(error);
	const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

	return (
		<div className="flex flex-col gap-1.75">
			{labelAccessory ? (
				<div className="flex items-baseline justify-between gap-3">
					<label htmlFor={id} className="text-[13.5px] font-semibold text-body">
						{label}
					</label>
					{labelAccessory}
				</div>
			) : (
				<label htmlFor={id} className="text-[13.5px] font-semibold text-body">
					{label}
				</label>
			)}
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				autoComplete={autoComplete}
				aria-invalid={invalid}
				aria-describedby={describedBy}
				className={`w-full rounded-[11px] border-[1.5px] bg-white px-3.5 py-3.25 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-faint ${
					invalid
						? 'border-[#B42318] focus:border-[#B42318] focus:shadow-[0_0_0_4px_rgba(180,35,24,0.10)]'
						: 'border-line focus:border-terracotta focus:shadow-[0_0_0_4px_rgba(198,93,59,0.10)]'
				}`}
			/>
			{error ? (
				<span id={`${id}-error`} role="alert" className="text-[12.5px] text-[#B42318]">
					{error}
				</span>
			) : (
				hint && (
					<span id={`${id}-hint`} className="text-[12.5px] text-faint">
						{hint}
					</span>
				)
			)}
		</div>
	);
}
