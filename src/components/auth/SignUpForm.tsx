"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import TextField from "@/components/auth/TextField";
import { Check } from "@/components/Icons";
import {
  PASSWORD_MIN_LENGTH,
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/validation";

type Values = { name: string; email: string; password: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", password: "" };

function validate(values: Values): Errors {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
}

const hasErrors = (errs: Errors) => Object.values(errs).some(Boolean);

export default function SignUpForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // Live-validate the touched field once the user has tried to submit.
    if (submitted) {
      setErrors((prev) => ({ ...prev, ...validateField(name, next) }));
    }
  };

  const validateField = (name: string, vals: Values): Errors => {
    if (name === "name") return { name: validateName(vals.name) };
    if (name === "email") return { email: validateEmail(vals.email) };
    if (name === "password") return { password: validatePassword(vals.password) };
    return {};
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    // TODO: replace with NextAuth → signIn("credentials", { ...values })
    console.log("sign-up (mock):", values);
    setDone(true);
  };

  if (done) {
    return (
      <div className="mt-7 flex flex-col items-center gap-3 rounded-[14px] border border-herb/30 bg-herb/10 px-6 py-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-herb text-white">
          <Check size={22} />
        </span>
        <h2 className="font-serif text-[22px] font-semibold">
          You&rsquo;re all set, {values.name.trim().split(" ")[0]}!
        </h2>
        <p className="max-w-[34ch] text-sm leading-[1.5] text-muted">
          This is a front-end demo — no account was actually created. Real
          sign-up gets wired to NextAuth next.
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
        className="mt-1 w-full rounded-[12px] bg-terracotta py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_rgba(198,93,59,0.3)] transition-colors hover:bg-terracotta/90"
      >
        Create Account
      </button>
    </form>
  );
}
