import type { PageItem } from "@/components/saved/types";

// Page numbers to render in the pagination strip. Short ranges are shown in
// full; long ones collapse to first / neighbors-of-current / last with
// ellipses in the gaps, e.g. 1 … 4 5 6 … 12.
export function pageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const shown = [
    ...new Set(
      [1, page - 1, page, page + 1, totalPages].filter(
        (p) => p >= 1 && p <= totalPages,
      ),
    ),
  ].sort((a, b) => a - b);

  const items: PageItem[] = [];
  let prev = 0;
  for (const p of shown) {
    if (p - prev > 1) items.push("ellipsis");
    items.push(p);
    prev = p;
  }
  return items;
}
