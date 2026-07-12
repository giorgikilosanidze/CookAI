import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { validateEmail, validateName, validatePassword } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  // Slow down scripted account creation.
  const limited = rateLimit(`signup:${clientIp(request)}`, 5, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many signup attempts — try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  const email =
    typeof body.email === "string"
      ? body.email.trim().toLowerCase().slice(0, 254)
      : "";
  const password = typeof body.password === "string" ? body.password.slice(0, 100) : "";

  // Same validators the form uses — the server is the source of truth.
  const invalid =
    validateName(name) ?? validateEmail(email) ?? validatePassword(password);
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 });
  }

  try {
    const passwordHash = await hash(password, 10);
    await prisma.user.create({ data: { name, email, passwordHash } });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }
    console.error("signup route error:", err);
    return NextResponse.json(
      { error: "Couldn't create your account right now. Please try again." },
      { status: 500 },
    );
  }
}
