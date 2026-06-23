import type { ReactNode } from "react";
import type { IconProps } from "@/components/icons/types";

type Props = IconProps & { children: ReactNode };

// Shared <svg> wrapper for the stroke-based icon set.
export default function Svg({ size = 24, children, ...props }: Props) {
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
