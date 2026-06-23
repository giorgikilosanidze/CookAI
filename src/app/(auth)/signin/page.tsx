import Link from "next/link";
import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import GoogleButton from "@/components/auth/GoogleButton";
import AuthDivider from "@/components/auth/AuthDivider";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign in · CookAI",
};

export default function SignInPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to get back to your saved recipes."
    >
      <GoogleButton label="Continue with Google" />
      <AuthDivider />
      <SignInForm />
      <p className="mt-6 text-center text-[14.5px] text-muted">
        Don&rsquo;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-terracotta no-underline hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthCard>
  );
}
