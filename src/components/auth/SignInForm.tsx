'use client';

import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { signIn } from 'next-auth/react';
import TextField from '@/components/auth/TextField';
import { EMPTY_SIGN_IN } from '@/components/auth/constants';
import { hasErrors, validateSignIn } from '@/components/auth/utils';
import type { FieldErrors, SignInValues } from '@/components/auth/types';

export default function SignInForm() {
	const [values, setValues] = useState<SignInValues>(EMPTY_SIGN_IN);
	const [errors, setErrors] = useState<FieldErrors<SignInValues>>({});
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState('');
	const [busy, setBusy] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const next = { ...values, [name]: value };
		setValues(next);
		if (submitted) setErrors(validateSignIn(next));
	};

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (busy) return;
		setSubmitted(true);
		setFormError('');
		const nextErrors = validateSignIn(values);
		setErrors(nextErrors);
		if (hasErrors(nextErrors)) return;

		setBusy(true);
		const res = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		});
		if (res?.error) {
			setFormError('Invalid email or password.');
			setBusy(false);
			return;
		}
		// Full navigation so the server-rendered Navbar picks up the session.
		window.location.assign('/generate');
	};

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
				{busy ? 'Signing in…' : 'Sign In'}
			</button>
		</form>
	);
}
