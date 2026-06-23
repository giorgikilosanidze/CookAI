import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function ArrowDown(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M12 5 v14 M6 13 l6 6 6 -6" />
    </Svg>
  );
}
