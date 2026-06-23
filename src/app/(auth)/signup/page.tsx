import Link from "next/link";
import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import GoogleButton from "@/components/auth/GoogleButton";
import AuthDivider from "@/components/auth/AuthDivider";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Create your account · CookAI",
};

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Save the recipes you love and build your own cookbook."
    >
      <GoogleButton label="Continue with Google" />
      <AuthDivider />
      <SignUpForm />
      <p className="mt-6 text-center text-[14.5px] text-muted">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-semibold text-terracotta no-underline hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
