// Streamed immediately while the recipe row is read, so a share link paints
// something instead of a blank document. Mirrors the article shell in page.tsx
// so swapping in the real content doesn't shift the layout.
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-190 px-6 pb-18 pt-13">
      <article className="overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_10px_36px_rgba(46,42,37,0.09)]">
        <div className="h-75 animate-pulse bg-cream-200 sm:h-95" />

        <div className="px-8.5 pb-9 pt-7.5">
          <div className="h-9 w-3/4 animate-pulse rounded-lg bg-cream-200" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-cream-200" />
          <div className="mt-2.5 h-4 w-5/6 animate-pulse rounded bg-cream-200" />

          <div className="my-6 h-px bg-line" />

          <div className="flex flex-wrap gap-10">
            <section className="min-w-[220px] flex-[1_1_240px]">
              <div className="mb-3.5 h-6 w-32 animate-pulse rounded bg-cream-200" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-b border-line py-[9px]">
                  <div className="h-4 w-full animate-pulse rounded bg-cream-200" />
                </div>
              ))}
            </section>

            <section className="min-w-[280px] flex-[2_1_340px]">
              <div className="mb-4 h-6 w-32 animate-pulse rounded bg-cream-200" />
              <div className="flex flex-col gap-[18px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-[15px]">
                    <div className="h-[30px] w-[30px] flex-none animate-pulse rounded-full bg-cream-200" />
                    <div className="flex-1">
                      <div className="h-4 w-full animate-pulse rounded bg-cream-200" />
                      <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-cream-200" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
