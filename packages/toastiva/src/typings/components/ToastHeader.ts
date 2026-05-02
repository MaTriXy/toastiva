import type { ValueOf } from "../../global-ts/value-of";
import type { ComponentType, ReactNode } from "react";
import type { StyleProp, TextStyle } from "react-native";
import type { WithSpringConfig } from "react-native-reanimated";
import type { IToastIcon } from "../dummy-icons/Icons";
import type { IHeaderLayer } from "../shared/ToastHeader";
import type { TToastivaAnimatedViewStyle } from "../styles/AnimatedStyles";
import type {
  IToastivaData,
  TToastivaHorizontalAlign,
  TToastivaType,
} from "../toast";
import type { TToastivaLayoutHandler } from "./common";

interface IToastHeaderProps {
  align: TToastivaHorizontalAlign;
  color: string;
  disableIOSBlur?: boolean;
  headerContent?: ReactNode;
  Icon: ComponentType<IToastIcon>;
  icon?: ValueOf<IToastivaData, "icon">;
  iosBlurTint?: ValueOf<IToastivaData, "iosBlurTint">;
  maxWidthStyle?: TToastivaAnimatedViewStyle;
  measure?: boolean;
  morphSpringConfig?: WithSpringConfig;
  onLayout?: TToastivaLayoutHandler;
  showIcon?: boolean;
  showIconBadge?: boolean;
  styleOverrides?: ValueOf<IToastivaData, "styles">;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  type: TToastivaType;
}

interface IToastHeaderContentProps {
  align: TToastivaHorizontalAlign;
  layer: IHeaderLayer;
  styleOverrides?: ValueOf<IToastivaData, "styles">;
  titleStyle?: StyleProp<TextStyle>;
}

export type { IToastHeaderContentProps, IToastHeaderProps };
