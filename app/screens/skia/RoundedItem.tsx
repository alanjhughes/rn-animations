import {
  Group,
  RoundedRect,
  interpolate,
  Extrapolate,
} from "@shopify/react-native-skia";
import React from "react";
import { CANVAS_HEIGHT, MAX_DISTANCE, SCREEN_WIDTH } from "./constants";
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

interface RoundedItemProps {
  x: number;
  y: number;
  width: number;
  height: number;
  point: SharedValue<{ x: number; y: number } | null>;
  progress: SharedValue<number>;
}

export const RoundedItem = React.memo(
  ({ point, progress, ...props }: RoundedItemProps) => {
    const { x, y } = props;
    const previouDistance = useSharedValue(0);
    const previousTouchedPoint = useSharedValue({
      x: SCREEN_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
    });

    const distance = useDerivedValue(() => {
      if (point.value == null) return previouDistance.value;
      previouDistance.value = Math.sqrt(
        (point.value.x - x) ** 2 + (point.value.y - y) ** 2,
      );
      return previouDistance.value;
    }, [point]);

    const scale = useDerivedValue(() => {
      return interpolate(
        distance.value * progress.value,
        [0, MAX_DISTANCE / 2],
        [1, 0],
        Extrapolate.CLAMP,
      );
    }, [distance, progress]);

    const transform = useDerivedValue(() => {
      return [{ scale: scale.value }];
    }, [scale]);

    const origin = useDerivedValue(() => {
      if (point.value == null) {
        return previousTouchedPoint.value;
      }
      previousTouchedPoint.value = point.value;
      return previousTouchedPoint.value;
    }, [point]);

    return (
      <Group origin={origin} transform={transform}>
        <RoundedRect {...props} r={4} />
      </Group>
    );
  },
);

RoundedItem.displayName = "RoundedItem";
