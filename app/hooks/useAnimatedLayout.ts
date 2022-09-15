import { useCallback } from "react";
import { LayoutChangeEvent } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export const useAnimatedLayout = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      const { layout } = nativeEvent;
      x.value = layout.x;
      y.value = layout.y;
      width.value = layout.width;
      height.value = layout.height;
    },
    [height, width, x, y],
  );

  return {
    x,
    y,
    width,
    height,
    onLayout,
  };
};
