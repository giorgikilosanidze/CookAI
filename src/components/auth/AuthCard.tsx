import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

// Centered auth card: CookAI logo + heading + subtitle, then content.
// Shared by the sign-up and (upcoming) sign-in pages.
export default function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div className="flex w-full max-w-[420px] flex-col rounded-[22px] border border-line bg-surface px-[38px] pb-[34px] pt-10 shadow-[0_18px_48px_rgba(46,42,37,0.12)]">
      <div className="flex flex-col items-center text-center">
        <Link href="/" className="flex items-center gap-[11px] no-underline">
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] bg-terracotta font-serif text-2xl font-semibold text-white shadow-[0_3px_8px_rgba(198,93,59,0.28)]">
            C
          </span>
          <span className="font-serif text-[27px] font-semibold tracking-[-0.01em] text-ink">
            CookAI
          </span>
        </Link>
        <h1 className="mt-6 font-serif text-[29px] font-semibold leading-[1.12] tracking-[-0.01em]">
          {title}
        </h1>
        <p className="mt-[9px] max-w-[30ch] text-[15px] leading-[1.5] text-muted">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
}
