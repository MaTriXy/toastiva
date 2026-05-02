import type { IBlobPathProps } from "../typings";
import type { ValueOf } from "../global-ts/value-of";
import type { ComponentProps } from "react";
import React, { memo } from "react";
import Animated from "react-native-reanimated";
import { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const BlobPath: React.MemoExoticComponent<React.FC<IBlobPathProps>> = memo(
  ({
    ...props
  }: IBlobPathProps): (React.ReactNode & React.ReactElement) | null => {
    const animatedProps = props.animatedProps as ValueOf<
      ComponentProps<typeof AnimatedPath>,
      "animatedProps"
    >;

    return (
      <AnimatedPath
        animatedProps={animatedProps}
        fill={props.fill}
        filter={props.filter}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        transform={props.transform}
      />
    );
  },
);

export { BlobPath };
