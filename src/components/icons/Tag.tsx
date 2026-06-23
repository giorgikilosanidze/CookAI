import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Tag(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="M4 5 h8 l8 8 -7 7 -8 -8 Z" />
      <circle cx="8" cy="9" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}
