// Gives /generate a prefetchable boundary. Without one, Next can only prefetch
// a stub for this dynamic route (measured: 211 bytes vs. 9 KB for the real
// payload), so clicking the navbar link paid a full server round trip before
// anything painted. Mirrors GeneratorClient's header + form card.
export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-190 flex-col gap-7 px-6 pb-18 pt-13">
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <div className="h-4 w-40 animate-pulse rounded bg-cream-200" />
        <div className="h-11 w-4/5 animate-pulse rounded-lg bg-cream-200" />
        <div className="h-5 w-3/5 animate-pulse rounded bg-cream-200" />
      </div>

      {/* Form card */}
      <div className="flex flex-col gap-5.5 rounded-[20px] border border-line bg-surface p-7 shadow-[0_6px_24px_rgba(46,42,37,0.05)]">
        <div className="flex flex-col gap-3">
          <div className="h-13 w-full animate-pulse rounded-[13px] bg-cream-200" />
          <div className="h-10 w-64 animate-pulse rounded-[11px] bg-cream-200" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-3.5 w-32 animate-pulse rounded bg-cream-200" />
          <div className="flex flex-wrap gap-3.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-11 flex-[1_1_150px] animate-pulse rounded-[11px] bg-cream-200"
              />
            ))}
          </div>
        </div>

        <div className="h-14 w-full animate-pulse rounded-[13px] bg-cream-200" />
      </div>
    </div>
  );
}
