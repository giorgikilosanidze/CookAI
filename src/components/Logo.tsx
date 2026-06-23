import Link from "next/link";

export default function Logo() {
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
