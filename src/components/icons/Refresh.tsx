import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Refresh(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M20 11 a8 8 0 0 0 -14.5 -3.5 M4 13 a8 8 0 0 0 14.5 3.5" />
      <path d="M5.5 3.5 v4 h4 M18.5 20.5 v-4 h-4" />
    </Svg>
  );
}
