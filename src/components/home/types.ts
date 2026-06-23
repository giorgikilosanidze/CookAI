import type { ComponentType } from "react";

export type Step = {
  number: string;
  title: string;
  caption: string;
  Icon: ComponentType<{ size?: number }>;
};
