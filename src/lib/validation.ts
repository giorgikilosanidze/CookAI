// Client-side field validators shared across auth forms.
// Each returns an error message string, or undefined when valid.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN_LENGTH = 8;

export function validateName(value: string): string | undefined {
  if (!value.trim()) return "Please enter your name.";
}

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Please enter your email.";
  if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address.";
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Please enter a password.";
  if (value.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
}
