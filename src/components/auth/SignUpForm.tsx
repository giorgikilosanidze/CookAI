'use client';

import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { signIn } from 'next-auth/react';
import TextField from '@/components/auth/TextField';
import { PASSWORD_MIN_LENGTH } from '@/lib/validation';
import { EMPTY_SIGN_UP } from '@/components/auth/constants';
import { hasErrors, validateSignUp } from '@/components/auth/utils';
import type { FieldErrors, SignUpValues } from '@/components/auth/types';

export default function SignUpForm() {
	const [values, setValues] = useState<SignUpValues>(EMPTY_SIGN_UP);
	const [errors, setErrors] = useState<FieldErrors<SignUpValues>>({});
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState('');
	const [busy, setBusy] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const next = { ...values, [name]: value };
		setValues(next);
		// Live-validate once the user has tried to submit.
		if (submitted) setErrors(validateSignUp(next));
	};

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (busy) return;
		setSubmitted(true);
		setFormError('');
		const nextErrors = validateSignUp(values);
		setErrors(nextErrors);
		if (hasErrors(nextErrors)) return;

		setBusy(true);
		try {
			const res = await fetch('/api/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => null);
				setFormError(data?.error ?? 'Something went wrong. Please try again.');
				setBusy(false);
				return;
			}
			// Account created — sign in with the same credentials and go cook.
			await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirectTo: '/generate',
			});
		} catch {
			setFormError('Something went wrong. Please try again.');
			setBusy(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
			<TextField
				id="su-name"
				name="name"
				label="Name"
				placeholder="Mara Reyes"
				autoComplete="name"
				value={values.name}
				onChange={handleChange}
				error={errors.name}
			/>
			<TextField
				id="su-email"
				name="email"
				label="Email"
				type="email"
				placeholder="you@example.com"
				autoComplete="email"
				value={values.email}
				onChange={handleChange}
				error={errors.email}
			/>
			<TextField
				id="su-pass"
				name="password"
				label="Password"
				type="password"
				placeholder="Create a password"
				autoComplete="new-password"
				value={values.password}
				onChange={handleChange}
				error={errors.password}
				hint={`At least ${PASSWORD_MIN_LENGTH} characters.`}
			/>
			{formError && (
				<p role="alert" className="text-[13.5px] font-medium text-[#B42318]">
					{formError}
				</p>
			)}
			<button
				type="submit"
				disabled={busy}
				className="mt-1 w-full rounded-md bg-terracotta py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_rgba(198,93,59,0.3)] transition-colors hover:bg-terracotta/90 cursor-pointer disabled:cursor-default disabled:opacity-70"
			>
				{busy ? 'Creating account…' : 'Create Account'}
			</button>
		</form>
	);
}
