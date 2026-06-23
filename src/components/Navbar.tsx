"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/generate", label: "Generate" },
  { href: "/saved", label: "Saved Recipes" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-[11px] no-underline">
      <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-terracotta font-serif text-[21px] font-semibold text-white shadow-cta">
        C
      </span>
      <span className="font-serif text-[23px] font-semibold tracking-tight text-ink">
        CookAI
      </span>
    </Link>
  );
}

export default function Navbar() {
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

        {/* Desktop: sign in */}
        <Link
          href="/signin"
          className="hidden items-center rounded-[10px] bg-terracotta px-5 py-2.5 text-[15px] font-semibold text-white no-underline shadow-cta transition-colors hover:bg-terracotta/90 md:inline-flex"
        >
          Sign in
        </Link>

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
          <Link
            href="/signin"
            onClick={() => setMenuOpen(false)}
            className="block w-full rounded-[10px] bg-terracotta px-3 py-3 text-center text-base font-semibold text-white no-underline"
          >
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
}
