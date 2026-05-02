import type { IToastivaData } from "../toast";
import type {
  IResolvedToastAnimationConfig,
  IResolvedToastSpringConfig,
} from "../utils";
import type { IToastSharedValue } from "./ToastSharedValue";

interface IUseToastEffectsParams {
  animationConfig: IResolvedToastAnimationConfig;
  bodyWidth: number;
  bodyRadius: number;
  collapsedOffset: number;
  collapsedCardHeight: number;
  expanded: boolean;
  expandedOffset: number;
  expandedHeight: number;
  hasBody: boolean;
  isDismissing: boolean;
  isFront: boolean;
  isMeasured: boolean;
  isTop: boolean;
  morphMode?: boolean;
  pillWidth: number;
  springConfig: IResolvedToastSpringConfig;
  shouldAutoExpand: boolean;
  shouldShowExpandedBody: boolean;
  stackDepth: number;
  toast: IToastivaData;
  values: IToastSharedValue;
}

export type { IUseToastEffectsParams };
