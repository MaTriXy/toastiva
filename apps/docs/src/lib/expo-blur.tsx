"use client";

import type { ComponentProps } from "react";
import { View } from "react-native";

export type BlurViewProps = ComponentProps<typeof View> & {
  intensity?: number;
  tint?: "light" | "dark" | "default" | "extraLight" | "regular" | "prominent";
};

export function BlurView({ intensity: _intensity, tint: _tint, ...props }: BlurViewProps) {
  return <View {...props} />;
}
