import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/validation";
import type {
  FieldErrors,
  SignInValues,
  SignUpValues,
} from "@/components/auth/types";

export function validateSignUp(
  values: SignUpValues,
): FieldErrors<SignUpValues> {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
}

export function validateSignIn(
  values: SignInValues,
): FieldErrors<SignInValues> {
  // Sign-in only checks presence + email format; password length rules live on sign-up.
  return {
    email: validateEmail(values.email),
    password: values.password ? undefined : "Please enter your password.",
  };
}

export const hasErrors = (errs: Record<string, string | undefined>) =>
  Object.values(errs).some(Boolean);
