"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/components/constants";

type Props = {
  user?: { name?: string | null; email?: string | null } | null;
};

export default function Navbar({ user }: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const deskLink = (active: boolean) =>
    active
      ? "rounded-[9px] bg-terracotta/10 px-[14px] py-2 text-[15px] font-semibold text-terracotta no-underline"
      : "rounded-[9px] px-[14px] py-2 text-[15px] font-medium text-subtle no-underline transition-colors hover:bg-cream-200";

  const mobileLink = (active: boolean) =>
    active
      ? "rounded-[9px] bg-terracotta/10 px-[14px] py-[11px] text-base font-semibold text-terracotta no-underline"
      : "rounded-[9px] px-[14px] py-[11px] text-base font-medium text-subtle no-underline hover:bg-cream-200";

  const displayName = user?.name?.trim() || user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="flex w-full items-center justify-between border-b border-line bg-cream px-7 py-[14px] shadow-[0_4px_16px_rgba(46,42,37,0.05)]">
        <div className="flex items-center gap-[34px]">
          <Logo />
          <div className="hidden items-center gap-1.5 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={deskLink(isActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: session chip + sign out, or sign in */}
        {user ? (
          <div className="hidden items-center gap-3 md:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-[15px] font-bold text-terracotta">
              {initial}
            </span>
            <span className="max-w-[16ch] truncate text-[15px] font-semibold text-ink">
              {displayName}
            </span>
            <button
              type="button"
              onClick={() => signOut({ redirectTo: "/" })}
              className="cursor-pointer rounded-[10px] border-[1.5px] border-line bg-surface px-4 py-2 text-[15px] font-semibold text-subtle transition-colors hover:border-terracotta hover:text-terracotta"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            className="hidden items-center rounded-[10px] bg-terracotta px-5 py-2.5 text-[15px] font-semibold text-white no-underline shadow-cta transition-colors hover:bg-terracotta/90 md:inline-flex"
          >
            Sign in
          </Link>
        )}

        {/* Mobile: hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-[10px] border border-line bg-surface md:hidden"
        >
          <span className="h-0.5 w-[17px] rounded-sm bg-ink" />
          <span className="h-0.5 w-[17px] rounded-sm bg-ink" />
          <span className="h-0.5 w-[17px] rounded-sm bg-ink" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col gap-1.5 border-b border-line bg-cream p-3.5 shadow-[0_12px_24px_rgba(46,42,37,0.10)] md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={mobileLink(isActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
          <div className="my-1.5 h-px bg-line" />
          {user ? (
            <>
              <div className="flex items-center gap-2.5 px-[14px] py-[7px]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta/10 text-sm font-bold text-terracotta">
                  {initial}
                </span>
                <span className="truncate text-base font-semibold text-ink">
                  {displayName}
                </span>
              </div>
              <button
                type="button"
                onClick={() => signOut({ redirectTo: "/" })}
                className="block w-full cursor-pointer rounded-[10px] border-[1.5px] border-line bg-surface px-3 py-3 text-center text-base font-semibold text-subtle"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-[10px] bg-terracotta px-3 py-3 text-center text-base font-semibold text-white no-underline"
            >
              Sign in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
