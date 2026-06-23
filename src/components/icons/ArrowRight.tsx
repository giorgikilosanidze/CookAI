import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function ArrowRight(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M5 12 h14 M13 6 l6 6 -6 6" />
    </Svg>
  );
}
