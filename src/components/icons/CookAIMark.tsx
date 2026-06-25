type Props = { size?: number };

// Brand mark: a terracotta bowl crowned by three herb sprigs. Multi-color
// fills map to the herb/terracotta theme tokens via Tailwind `fill-*` utilities.
export default function CookAIMark({ size = 38 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <g transform="translate(0,-9)">
        <rect x="26.5" y="12" width="3" height="13" rx="1.5" className="fill-herb" />
        <rect x="34.5" y="9" width="3" height="16" rx="1.5" className="fill-herb" />
        <rect x="42.5" y="12" width="3" height="13" rx="1.5" className="fill-herb" />
        <path d="M9 34 A27 27 0 0 0 63 34 Z" className="fill-terracotta" />
        <rect x="6" y="31" width="60" height="5" rx="2.5" className="fill-terracotta" />
      </g>
    </svg>
  );
}
