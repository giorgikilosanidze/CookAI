import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Trash(props: IconProps) {
  return (
    <Svg strokeWidth={1.9} {...props}>
      <path d="M4 7 h16 M9 7 V5 a1 1 0 0 1 1 -1 h4 a1 1 0 0 1 1 1 V7 M6 7 l1 13 a1 1 0 0 0 1 1 h8 a1 1 0 0 0 1 -1 l1 -13 M10 11 v6 M14 11 v6" />
    </Svg>
  );
}
