import type { ValueOf } from "../../global-ts/value-of";
import type { ComponentType } from "react";
import type { GestureType } from "react-native-gesture-handler";
import type { WithSpringConfig } from "react-native-reanimated";
import type { IToastIcon } from "../dummy-icons/Icons";
import type { IToastAnimatedStylesResult } from "../styles/AnimatedStyles";
import type {
  IToastivaData,
  TToastivaBodyLayout,
  TToastivaHorizontalAlign,
} from "../toast";
import type { TToastivaLayoutHandler } from "./common";

interface IToastCardHeights {
  collapsedCardHeight: number;
  expandedHeight: number;
  renderHeight: number;
}

interface IToastCardMeasurements {
  isCardHeightCurrent: boolean;
  isPillWidthCurrent: boolean;
  measuredHeight: number;
  measuredPillWidth: number;
  onMeasureCard: TToastivaLayoutHandler;
  onMeasureHeader: TToastivaLayoutHandler;
}

interface IToastCardProps {
  Icon: ComponentType<IToastIcon>;
  animated: IToastAnimatedStylesResult;
  morphSpringConfig?: WithSpringConfig;
  bodyLayout: TToastivaBodyLayout;
  color: string;
  disableIOSBlur: boolean;
  expanded: boolean;
  gesture: GestureType;
  headerAlign: TToastivaHorizontalAlign;
  heights: IToastCardHeights;
  isFront: boolean;
  isTop: boolean;
  iosBlurTint?: ValueOf<IToastivaData, "iosBlurTint">;
  measureBody: boolean;
  measure: IToastCardMeasurements;
  meta?: string;
  noHeader?: boolean;
  morphAlign: TToastivaHorizontalAlign;
  onAction: () => void;
  onPress: () => void;
  showBody: boolean;
  showProgress: boolean;
  stackAlign: TToastivaHorizontalAlign;
  stroke: string;
  styleOverrides?: ValueOf<IToastivaData, "styles">;
  surfaceFill: string;
  toast: IToastivaData;
  widths: IToastCardWidths;
}

interface IToastCardWidths {
  bodyWidth: number;
  maxWidth: number;
  pillWidth: number;
}

export type {
  IToastCardHeights,
  IToastCardMeasurements,
  IToastCardProps,
  IToastCardWidths,
};
