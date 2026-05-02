import type { ValueOf } from "../../global-ts/value-of";
import type { ComponentType, ReactNode } from "react";
import type { StyleProp, TextStyle } from "react-native";
import type { WithSpringConfig } from "react-native-reanimated";
import type { IToastIcon } from "../dummy-icons";
import type { IToastivaData, TToastivaType } from "../toast";

interface IHeaderLayer {
  key: string;
  type: TToastivaType;
  title: string;
  Icon: ComponentType<IToastIcon>;
  color: string;
  icon?: ValueOf<IToastivaData, "icon">;
  headerContent?: ReactNode;
  showIcon?: boolean;
  showIconBadge?: boolean;
}

interface IHeaderLayerParams {
  color: string;
  Icon: ComponentType<IToastIcon>;
  headerContent?: ReactNode;
  icon?: ValueOf<IToastivaData, "icon">;
  showIcon?: boolean;
  showIconBadge?: boolean;
  title: string;
  type: TToastivaType;
}

interface IUseToastHeaderMorphParams extends IHeaderLayerParams {
  measure?: boolean;
  morphSpringConfig?: WithSpringConfig;
}

interface IToastHeaderSmearTitleStyleParams {
  color: string;
}

interface IToastHeaderTitleStyleParams {
  titleStyle?: StyleProp<TextStyle>;
}

export type {
  IHeaderLayer,
  IHeaderLayerParams,
  IToastHeaderSmearTitleStyleParams,
  IToastHeaderTitleStyleParams,
  IUseToastHeaderMorphParams,
};
