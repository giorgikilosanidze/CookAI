'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import TextField from '@/components/auth/TextField';
import Check from '@/components/icons/Check';
import { EMPTY_SIGN_IN } from '@/components/auth/constants';
import { hasErrors, validateSignIn } from '@/components/auth/utils';
import type { FieldErrors, SignInValues } from '@/components/auth/types';

export default function SignInForm() {
	const [values, setValues] = useState<SignInValues>(EMPTY_SIGN_IN);
	const [errors, setErrors] = useState<FieldErrors<SignInValues>>({});
	const [submitted, setSubmitted] = useState(false);
	const [done, setDone] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const next = { ...values, [name]: value };
		setValues(next);
		if (submitted) setErrors(validateSignIn(next));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitted(true);
		const nextErrors = validateSignIn(values);
		setErrors(nextErrors);
		if (hasErrors(nextErrors)) return;

		// TODO: replace with NextAuth → signIn("credentials", { ...values })
		console.log('sign-in (mock):', values);
		setDone(true);
	};

	if (done) {
		return (
			<div className="mt-7 flex flex-col items-center gap-3 rounded-lg border border-herb/30 bg-herb/10 px-6 py-8 text-center">
				<span className="flex h-12 w-12 items-center justify-center rounded-full bg-herb text-white">
					<Check size={22} />
				</span>
				<h2 className="font-serif text-[22px] font-semibold">Welcome back!</h2>
				<p className="max-w-[34ch] text-sm leading-normal text-muted">
					This is a front-end demo — no real sign-in happened yet. Auth gets wired to
					NextAuth next.
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
			<TextField
				id="si-email"
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
				id="si-pass"
				name="password"
				label="Password"
				type="password"
				placeholder="Enter your password"
				autoComplete="current-password"
				value={values.password}
				onChange={handleChange}
				error={errors.password}
				labelAccessory={
					<a
						href="#"
						className="text-[12.5px] font-semibold text-terracotta no-underline hover:underline"
					>
						Forgot password?
					</a>
				}
			/>
			<button
				type="submit"
				className="mt-1 w-full rounded-md bg-terracotta py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_rgba(198,93,59,0.3)] transition-colors hover:bg-terracotta/90"
			>
				Sign In
			</button>
		</form>
	);
}
