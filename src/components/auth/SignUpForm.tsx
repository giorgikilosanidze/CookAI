'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import TextField from '@/components/auth/TextField';
import Check from '@/components/icons/Check';
import { PASSWORD_MIN_LENGTH } from '@/lib/validation';
import { EMPTY_SIGN_UP } from '@/components/auth/constants';
import { hasErrors, validateSignUp } from '@/components/auth/utils';
import type { FieldErrors, SignUpValues } from '@/components/auth/types';

export default function SignUpForm() {
	const [values, setValues] = useState<SignUpValues>(EMPTY_SIGN_UP);
	const [errors, setErrors] = useState<FieldErrors<SignUpValues>>({});
	const [submitted, setSubmitted] = useState(false);
	const [done, setDone] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const next = { ...values, [name]: value };
		setValues(next);
		// Live-validate once the user has tried to submit.
		if (submitted) setErrors(validateSignUp(next));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitted(true);
		const nextErrors = validateSignUp(values);
		setErrors(nextErrors);
		if (hasErrors(nextErrors)) return;

		// TODO: replace with NextAuth → signIn("credentials", { ...values })
		console.log('sign-up (mock):', values);
		setDone(true);
	};

	if (done) {
		return (
			<div className="mt-7 flex flex-col items-center gap-3 rounded-lg border border-herb/30 bg-herb/10 px-6 py-8 text-center">
				<span className="flex h-12 w-12 items-center justify-center rounded-full bg-herb text-white">
					<Check size={22} />
				</span>
				<h2 className="font-serif text-[22px] font-semibold">
					You&rsquo;re all set, {values.name.trim().split(' ')[0]}!
				</h2>
				<p className="max-w-[34ch] text-sm leading-normal text-muted">
					This is a front-end demo — no account was actually created. Real sign-up gets
					wired to NextAuth next.
				</p>
			</div>
		);
	}

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
			<button
				type="submit"
				className="mt-1 w-full rounded-md bg-terracotta py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_rgba(198,93,59,0.3)] transition-colors hover:bg-terracotta/90 cursor-pointer"
			>
				Create Account
			</button>
		</form>
	);
}
