import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M5 12 h14 M13 6 l6 6 -6 6" />
    </Svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M12 5 v14 M6 13 l6 6 6 -6" />
    </Svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <Svg strokeWidth={1.9} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 v5 l3.5 2" />
    </Svg>
  );
}

export function Bowl(props: IconProps) {
  return (
    <Svg strokeWidth={1.9} {...props}>
      <path d="M3.5 12 h17 a8.5 8.5 0 0 1 -17 0 Z" />
      <path d="M9 7 q1.4 -1.6 0 -3.4 M13 7 q1.4 -1.6 0 -3.4" />
    </Svg>
  );
}

export function Tag(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="M4 5 h8 l8 8 -7 7 -8 -8 Z" />
      <circle cx="8" cy="9" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <Svg strokeWidth={1.6} {...props}>
      <path d="M12 3 l1.9 5.6 5.6 1.9 -5.6 1.9 -1.9 5.6 -1.9 -5.6 -5.6 -1.9 5.6 -1.9 Z" />
    </Svg>
  );
}

export function Bookmark(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="M6 3 h12 v18 l-6 -4 -6 4 Z" />
    </Svg>
  );
}

export function Check(props: IconProps) {
  return (
    <Svg strokeWidth={2.4} {...props}>
      <path d="M5 12 l4 4 L19 6" />
    </Svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M6 9 l6 6 6 -6" />
    </Svg>
  );
}

export function Trash(props: IconProps) {
  return (
    <Svg strokeWidth={1.9} {...props}>
      <path d="M4 7 h16 M9 7 V5 a1 1 0 0 1 1 -1 h4 a1 1 0 0 1 1 1 V7 M6 7 l1 13 a1 1 0 0 0 1 1 h8 a1 1 0 0 0 1 -1 l1 -13 M10 11 v6 M14 11 v6" />
    </Svg>
  );
}

// Multicolor Google "G" — fill-based, so it doesn't use the stroke <Svg> wrapper.
export function GoogleLogo({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.5C29.7 34.6 27 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.5 5.5c-.5.4 6.3-4.6 6.3-15.1 0-1.3-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
