import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Close(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M6 6 l12 12 M18 6 l-12 12" />
    </Svg>
  );
}
