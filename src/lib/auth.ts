import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rateLimit";

// Auth.js surfaces `code` on the client's signIn() result, so the form can say
// "wait a bit" instead of repeating "invalid email or password" — which would
// otherwise be indistinguishable from a wrong password.
class TooManyAttempts extends CredentialsSignin {
  code = "too_many_attempts";
}

// Google shows up in the UI only when its OAuth keys are configured, so
// credentials auth works before (or without) a Google Cloud setup.
export const googleEnabled = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // JWT sessions: required for the Credentials provider; OAuth users still
  // get persisted to the database via the adapter.
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  providers: [
    ...(googleEnabled ? [Google] : []),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials, request) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase().slice(0, 254)
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";
        if (!email || !password) return null;

        // Without this, sign-in is an unlimited password oracle — signup is
        // throttled but this endpoint takes as many guesses as you can send.
        // Two limits: per client so one host can't spray many accounts, and
        // per account so a distributed attempt can't grind a single one.
        const [byIp, byAccount] = await Promise.all([
          rateLimit(`signin-ip:${clientIp(request)}`, 10, 5 * 60_000),
          rateLimit(`signin-email:${email}`, 10, 15 * 60_000),
        ]);
        if (!byIp.ok || !byAccount.ok) throw new TooManyAttempts();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const valid = await compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (typeof token.id === "string") session.user.id = token.id;
      return session;
    },
  },
});
