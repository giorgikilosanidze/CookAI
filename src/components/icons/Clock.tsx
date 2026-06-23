import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Clock(props: IconProps) {
  return (
    <Svg strokeWidth={1.9} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 v5 l3.5 2" />
    </Svg>
  );
}
