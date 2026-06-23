import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Check(props: IconProps) {
  return (
    <Svg strokeWidth={2.4} {...props}>
      <path d="M5 12 l4 4 L19 6" />
    </Svg>
  );
}
