"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import TextField from "@/components/auth/TextField";
import { Check } from "@/components/Icons";
import { validateEmail } from "@/lib/validation";

type Values = { email: string; password: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { email: "", password: "" };

// Sign-in only checks that fields are present and the email looks valid —
// password length rules belong on sign-up, not here.
function validate(values: Values): Errors {
  return {
    email: validateEmail(values.email),
    password: values.password ? undefined : "Please enter your password.",
  };
}

const hasErrors = (errs: Errors) => Object.values(errs).some(Boolean);

export default function SignInForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    // TODO: replace with NextAuth → signIn("credentials", { ...values })
    console.log("sign-in (mock):", values);
    setDone(true);
  };

  if (done) {
    return (
      <div className="mt-7 flex flex-col items-center gap-3 rounded-[14px] border border-herb/30 bg-herb/10 px-6 py-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-herb text-white">
          <Check size={22} />
        </span>
        <h2 className="font-serif text-[22px] font-semibold">Welcome back!</h2>
        <p className="max-w-[34ch] text-sm leading-[1.5] text-muted">
          This is a front-end demo — no real sign-in happened yet. Auth gets
          wired to NextAuth next.
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
        className="mt-1 w-full rounded-[12px] bg-terracotta py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_rgba(198,93,59,0.3)] transition-colors hover:bg-terracotta/90"
      >
        Sign In
      </button>
    </form>
  );
}
