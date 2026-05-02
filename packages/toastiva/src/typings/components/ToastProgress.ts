import type { StyleProp, ViewStyle } from "react-native";
import type { TToastivaAnimatedViewStyle } from "./common";

interface IToastProgressProps {
  backgroundColor: string;
  fillStyle?: StyleProp<ViewStyle>;
  inline?: boolean;
  style: TToastivaAnimatedViewStyle;
  trackStyle?: StyleProp<ViewStyle>;
}

export type { IToastProgressProps };
