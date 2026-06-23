import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function ChevronDown(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M6 9 l6 6 6 -6" />
    </Svg>
  );
}
