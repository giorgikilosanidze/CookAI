import Link from "next/link";
import { pageItems } from "@/components/saved/utils";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";

type Props = {
  page: number;
  totalPages: number;
};

const cellBase =
  "flex h-10 min-w-10 items-center justify-center rounded-[11px] text-[15px] font-semibold transition-colors";
const cellIdle = `${cellBase} border-[1.5px] border-line text-muted no-underline hover:border-terracotta hover:text-terracotta`;
const cellDisabled = `${cellBase} border-[1.5px] border-line text-muted opacity-40`;

export default function Pagination({ page, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) => (p === 1 ? "/saved" : `/saved?page=${p}`);

  return (
    <nav aria-label="Saved recipes pages" className="flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} aria-label="Previous page" className={cellIdle}>
          <ChevronLeft size={16} />
        </Link>
      ) : (
        <span aria-hidden="true" className={cellDisabled}>
          <ChevronLeft size={16} />
        </span>
      )}

      {pageItems(page, totalPages).map((item, i) =>
        item === "ellipsis" ? (
          <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-muted">
            …
          </span>
        ) : item === page ? (
          <span
            key={item}
            aria-current="page"
            className={`${cellBase} border-[1.5px] border-terracotta bg-terracotta text-white`}
          >
            {item}
          </span>
        ) : (
          <Link key={item} href={hrefFor(item)} className={cellIdle}>
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} aria-label="Next page" className={cellIdle}>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span aria-hidden="true" className={cellDisabled}>
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
