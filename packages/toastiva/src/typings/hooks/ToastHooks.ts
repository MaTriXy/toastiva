import type { IToastSharedValue } from "../shared/ToastSharedValue";
import type { IHeightEntry } from "../store/ToastStore";
import type { IToastivaData } from "../toast";
import type {
  IResolvedToastAnimationConfig,
  IResolvedToastSpringConfig,
} from "../utils";

interface IUseToastDismissParams {
  expanded: boolean;
  hasBody: boolean;
  isExpandedCandidate: boolean;
  isFront: boolean;
  isVisible: boolean;
  onRemove: (id: string) => void;
  paused?: boolean;
  animationConfig: IResolvedToastAnimationConfig;
  shouldAutoExpand: boolean;
  springConfig: IResolvedToastSpringConfig;
  showBody: boolean;
  toast: IToastivaData;
  values: IToastSharedValue;
}

interface IUseToasterStateResult {
  heights: IHeightEntry[];
  toasts: IToastivaData[];
}

export type { IUseToastDismissParams, IUseToasterStateResult };
