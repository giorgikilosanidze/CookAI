import Link from "next/link";
import ArrowRight from "@/components/icons/ArrowRight";
import Bookmark from "@/components/icons/Bookmark";

export default function EmptyState() {
  return (
    <div className="flex animate-fade-up flex-col items-center gap-[18px] rounded-[22px] border border-line bg-surface px-6 pb-[72px] pt-16 text-center shadow-[0_4px_16px_rgba(46,42,37,0.05)]">
      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
        <Bookmark size={38} />
      </div>
      <h2 className="font-serif text-[30px] font-semibold leading-[1.1]">
        No saved recipes yet
      </h2>
      <p className="max-w-[42ch] text-body leading-[1.55] text-muted">
        Generate a recipe from whatever&rsquo;s in your kitchen, then tap{" "}
        <strong className="font-semibold text-ink">Save</strong> to keep it here
        for next time.
      </p>
      <Link
        href="/generate"
        className="mt-1.5 inline-flex items-center gap-2 rounded-[12px] bg-terracotta px-[26px] py-3.5 text-base font-semibold text-white no-underline shadow-[0_4px_14px_rgba(198,93,59,0.3)] transition-colors hover:bg-terracotta/90"
      >
        Generate your first recipe
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
