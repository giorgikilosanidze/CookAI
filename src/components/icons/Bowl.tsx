import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Bowl(props: IconProps) {
  return (
    <Svg strokeWidth={1.9} {...props}>
      <path d="M3.5 12 h17 a8.5 8.5 0 0 1 -17 0 Z" />
      <path d="M9 7 q1.4 -1.6 0 -3.4 M13 7 q1.4 -1.6 0 -3.4" />
    </Svg>
  );
}
