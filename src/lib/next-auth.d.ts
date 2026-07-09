import type { DefaultSession } from "next-auth";

// The session callback in lib/auth.ts copies the user id from the JWT onto
// the session, so consumers get a typed `session.user.id`.
declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}
