import Link from "next/link";
import { ArrowDown, ArrowRight, Bowl, Clock } from "@/components/Icons";

const INGREDIENTS = ["chicken", "rice", "onion", "garlic"];

function KitchenCard() {
  return (
    <div className="w-full max-w-[420px] rounded-[22px] border border-line bg-surface p-[26px] shadow-[0_18px_48px_rgba(46,42,37,0.12)]">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        Your kitchen
      </span>

      <div className="mt-3 flex flex-wrap gap-2">
        {INGREDIENTS.map((item) => (
          <span
            key={item}
            className="rounded-full bg-terracotta/10 px-[13px] py-[7px] text-sm font-semibold text-terracotta"
          >
            {item}
          </span>
        ))}
        <span className="rounded-full bg-cream-200 px-[13px] py-[7px] text-sm font-semibold text-muted">
          +2
        </span>
      </div>

      <div className="my-[18px] flex items-center gap-3">
        <div className="h-px flex-1 bg-line" />
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-terracotta text-white shadow-cta">
          <ArrowDown size={17} />
        </span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <div className="overflow-hidden rounded-xl border border-line">
        <div className="relative h-[118px] bg-[repeating-linear-gradient(135deg,#F0E3D3,#F0E3D3_13px,#EAD9C6_13px,#EAD9C6_26px)]">
          <span className="absolute bottom-[11px] left-[13px] font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
            dish photo
          </span>
        </div>
        <div className="px-4 pb-[17px] pt-[15px]">
          <h3 className="font-serif text-xl font-semibold leading-tight text-ink">
            Golden Chicken &amp; Herb Rice Skillet
          </h3>
          <div className="mt-[9px] flex gap-4 text-[13px] font-medium text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              35 min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bowl size={14} />
              Serves 4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-[1120px] flex-wrap items-center gap-12 px-6 pb-14 pt-16">
      <div className="flex min-w-[300px] flex-[1_1_420px] flex-col gap-[22px]">
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-terracotta/10 px-3.5 py-[7px] text-[13px] font-bold tracking-[0.06em] text-terracotta">
          <span className="h-[7px] w-[7px] rounded-full bg-terracotta" />
          AI RECIPE GENERATOR
        </span>

        <h1 className="font-serif text-display font-semibold leading-[1.02] tracking-[-0.02em] sm:text-display-lg">
          Turn whatever&rsquo;s in your fridge into dinner.
        </h1>

        <p className="max-w-[52ch] text-lead text-subtle">
          List the ingredients you already have and CookAI writes a complete,
          cook-tonight recipe in seconds — amounts, steps, and all. No meal
          planning, no grocery run.
        </p>

        <div className="mt-1.5 flex flex-wrap gap-3.5">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 rounded-[13px] bg-terracotta px-7 py-[15px] text-[17px] font-semibold text-white no-underline shadow-[0_6px_18px_rgba(198,93,59,0.3)] transition-colors hover:bg-terracotta/90"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center rounded-[13px] border-[1.5px] border-line px-6 py-[15px] text-[17px] font-semibold text-subtle no-underline transition-colors hover:border-terracotta hover:text-terracotta"
          >
            See how it works
          </Link>
        </div>
      </div>

      <div className="flex min-w-[300px] flex-[1_1_380px] justify-center">
        <KitchenCard />
      </div>
    </section>
  );
}
