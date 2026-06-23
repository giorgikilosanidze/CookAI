import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Sparkle(props: IconProps) {
  return (
    <Svg strokeWidth={1.6} {...props}>
      <path d="M12 3 l1.9 5.6 5.6 1.9 -5.6 1.9 -1.9 5.6 -1.9 -5.6 -5.6 -1.9 5.6 -1.9 Z" />
    </Svg>
  );
}
