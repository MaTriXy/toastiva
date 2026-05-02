import type { IToastivaStyleOverrides, TToastivaBodyLayout } from "../toast";

interface IToastDescriptionProps {
  description: string;
  layout: TToastivaBodyLayout;
  meta?: string;
  styleOverrides?: IToastivaStyleOverrides;
}

export type { IToastDescriptionProps };
