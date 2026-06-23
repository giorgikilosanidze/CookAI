import Link from "next/link";
import ArrowRight from "@/components/icons/ArrowRight";
import KitchenCard from "@/components/home/KitchenCard";

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
