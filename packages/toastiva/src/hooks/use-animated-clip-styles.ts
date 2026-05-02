import { PH } from "../constants";
import { IUseToastAnimatedStylesParams } from "../typings";
import { useAnimatedStyle } from "react-native-reanimated";

const useAnimatedClipStyle = <T extends IUseToastAnimatedStylesParams>(
  params: T,
) => {
  const { values } = params;

  return useAnimatedStyle(() => {
    const progress = values.morphProgress.value;
    const t = progress < 0 ? 0 : progress > 1 ? 1 : progress;
    const pillRadius = PH / 2;
    const bodyRadius = values.bodyRadius.value;

    return {
      borderRadius: pillRadius + (bodyRadius - pillRadius) * t,
    };
  }, []);
};

export { useAnimatedClipStyle };
