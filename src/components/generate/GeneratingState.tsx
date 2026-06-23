"use client";

const shimmer =
  "bg-[linear-gradient(90deg,#EFE6D8_25%,#F7F1E7_50%,#EFE6D8_75%)] bg-[length:200%_100%] animate-shimmer";

type Props = {
  statusText: string;
  onCancel: () => void;
};

export default function GeneratingState({ statusText, onCancel }: Props) {
  return (
    <div className="flex animate-fade-up flex-col items-center gap-5 rounded-[20px] border border-line bg-surface px-8 py-9 shadow-[0_6px_24px_rgba(46,42,37,0.05)]">
      {/* Bubbling pot */}
      <div className="flex flex-col items-center">
        <div className="mb-[7px] flex h-7 items-end gap-2">
          {[0, 0.5, 1].map((delay) => (
            <span
              key={delay}
              style={{ animationDelay: `${delay}s` }}
              className="h-6 w-[5px] origin-bottom animate-steam rounded-full bg-terracotta/40"
            />
          ))}
        </div>
        <div className="relative z-[2] -mb-[3px] h-3 w-[88px] rounded-full bg-[#A8442A] shadow-[0_2px_5px_rgba(168,68,42,0.3)]" />
        <div className="relative h-[50px] w-[74px] overflow-hidden rounded-b-[26px] bg-gradient-to-b from-[#D9714F] to-[#B14A2D]">
          {[
            { left: 18, size: 9, delay: 0 },
            { left: 34, size: 11, delay: 0.6 },
            { left: 48, size: 8, delay: 1 },
          ].map((b) => (
            <span
              key={b.left}
              style={{
                left: b.left,
                width: b.size,
                height: b.size,
                animationDelay: `${b.delay}s`,
              }}
              className="absolute bottom-2 animate-bubble rounded-full bg-[rgba(255,247,240,0.6)]"
            />
          ))}
        </div>
      </div>

      <div className="min-h-7 text-center font-serif text-[21px] font-medium text-ink">
        {statusText}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full max-w-[340px] overflow-hidden rounded-full bg-cream-200">
        <div className="h-full w-[28%] animate-progress rounded-full bg-terracotta" />
      </div>

      <div className="mt-1.5 h-px w-full bg-line" />

      {/* Shimmer skeleton */}
      <div className="flex w-full flex-col gap-4">
        <div className={`h-6 w-[58%] rounded-lg ${shimmer}`} />
        <div className="flex gap-2.5">
          <div className={`h-[18px] w-20 rounded-full ${shimmer}`} />
          <div className={`h-[18px] w-24 rounded-full ${shimmer}`} />
          <div className={`h-[18px] w-[72px] rounded-full ${shimmer}`} />
        </div>
        <div className="mt-1.5 flex flex-wrap gap-7">
          <div className="flex flex-[1_1_200px] flex-col gap-[11px]">
            {["88%", "74%", "81%", "66%"].map((w) => (
              <div
                key={w}
                style={{ width: w }}
                className={`h-[13px] rounded-[7px] ${shimmer}`}
              />
            ))}
          </div>
          <div className="flex flex-[1_1_200px] flex-col gap-[11px]">
            {["94%", "78%", "85%", "59%"].map((w) => (
              <div
                key={w}
                style={{ width: w }}
                className={`h-[13px] rounded-[7px] ${shimmer}`}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="mt-1.5 text-sm font-semibold text-faint underline underline-offset-[3px]"
      >
        Cancel
      </button>
    </div>
  );
}
