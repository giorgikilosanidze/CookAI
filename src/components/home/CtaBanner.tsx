import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export default function CtaBanner() {
  return (
    <section className="mx-auto w-full max-w-[1120px] px-6 py-[72px]">
      <div className="flex flex-col items-center gap-[18px] rounded-[24px] bg-terracotta px-10 py-14 text-center shadow-[0_16px_40px_rgba(198,93,59,0.28)]">
        <h2 className="max-w-[20ch] font-serif text-h2 font-semibold leading-[1.1] tracking-[-0.015em] text-white sm:text-display">
          Hungry yet? Let&rsquo;s see what you can make.
        </h2>
        <p className="max-w-[46ch] text-[17px] leading-[1.5] text-cream/90">
          It&rsquo;s free to try — no account needed to generate your first
          recipe.
        </p>
        <Link
          href="/generate"
          className="mt-2 inline-flex items-center gap-2 rounded-[13px] bg-surface px-[30px] py-[15px] text-[17px] font-semibold text-terracotta no-underline shadow-[0_6px_16px_rgba(46,42,37,0.18)] transition-colors hover:bg-white"
        >
          Generate a recipe
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
