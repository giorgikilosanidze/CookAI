import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Bookmark(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="M6 3 h12 v18 l-6 -4 -6 4 Z" />
    </Svg>
  );
}
