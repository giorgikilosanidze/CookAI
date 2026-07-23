import Svg from "@/components/icons/Svg";
import type { IconProps } from "@/components/icons/types";

export default function Camera(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </Svg>
  );
}
