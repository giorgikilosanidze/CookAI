import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

// Temporary placeholder for routes not yet built. Replaced page-by-page later.
export default function ComingSoon({ eyebrow, title, description }: Props) {
  return (
    <section className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-5 px-6 py-24 text-center">
      <span className="text-eyebrow uppercase text-terracotta">{eyebrow}</span>
      <h1 className="max-w-[18ch] font-serif text-display font-semibold leading-[1.05] tracking-[-0.015em]">
        {title}
      </h1>
      <p className="max-w-[52ch] text-lead text-subtle">{description}</p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-[13px] border-[1.5px] border-line px-6 py-[13px] text-base font-semibold text-subtle no-underline transition-colors hover:border-terracotta hover:text-terracotta"
      >
        Back home
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}
