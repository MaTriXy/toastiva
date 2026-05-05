import React, { memo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { ICON_SIZE } from "../constants";
import { useToastTheme } from "../context";
import { styles } from "../styles/toast.styles";
import type { IToastHeaderContentProps } from "../typings";
import { ToastivaHorizontalAlign } from "../typings";
const ToastHeaderContent: React.NamedExoticComponent<IToastHeaderContentProps> =
  memo(function ToastHeaderContent({
    ...props
  }: IToastHeaderContentProps): (React.ReactNode & React.ReactElement) | null {
    const theme = useToastTheme();
    const showIcon = props.layer.showIcon ?? true;
    const showIconBadge = props.layer.showIconBadge ?? true;
    return (
      <>
        {showIcon ? (
          <View
            style={[
              showIconBadge ? styles.iconWrap : styles.iconPlainWrap,
              showIconBadge
                ? { backgroundColor: theme.badgeBgColors[props.layer.type] }
                : null,
              props.styleOverrides?.badge,
            ]}
          >
            {props.layer.icon ?? (
              <props.layer.Icon size={ICON_SIZE} color={props.layer.color} />
            )}
          </View>
        ) : null}
        <Animated.View
          style={showIcon ? titleWrapStyle : styles.titleNoIconWrap}
        >
          <Animated.Text
            style={[
              styles.titleText,
              showIcon ? null : styles.titleTextNoIcon,
              showIcon
                ? props.align === ToastivaHorizontalAlign.Center
                  ? styles.textCenter
                  : null
                : null,
              showIcon
                ? props.align === ToastivaHorizontalAlign.Right
                  ? styles.textRight
                  : styles.textLeft
                : styles.textCenter,
              { color: props.layer.color },
              props.styleOverrides?.title,
              props.titleStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {props.layer.title}
          </Animated.Text>
        </Animated.View>
      </>
    );
  });

const titleWrapStyle = {
  justifyContent: "center" as const,
};

export { ToastHeaderContent };
