import ArrowDown from "@/components/icons/ArrowDown";
import Bowl from "@/components/icons/Bowl";
import Clock from "@/components/icons/Clock";
import { INGREDIENTS } from "@/components/home/constants";

export default function KitchenCard() {
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
