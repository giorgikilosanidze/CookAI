import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function ChevronLeft(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M15 6 l-6 6 6 6" />
    </Svg>
  );
}
