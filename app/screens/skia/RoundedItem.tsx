import {
  Group,
  useValue,
  RoundedRect,
  SkiaMutableValue,
  useComputedValue,
  interpolate,
  Extrapolate,
} from "@shopify/react-native-skia";
import React from "react";
import { CANVAS_HEIGHT, MAX_DISTANCE, SCREEN_WIDTH } from "./constants";

interface RoundedItemProps {
  x: number;
  y: number;
  width: number;
  height: number;
  point: SkiaMutableValue<{ x: number; y: number } | null>;
  progress: SkiaMutableValue<number>;
}

export const RoundedItem = React.memo(
  ({ point, progress, ...props }: RoundedItemProps) => {
    const { x, y } = props;
    const previouDistance = useValue(0);
    const previousTouchedPoint = useValue({
      x: SCREEN_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
    });

    const distance = useComputedValue(() => {
      if (point.current == null) return previouDistance.current;
      previouDistance.current = Math.sqrt(
        (point.current.x - x) ** 2 + (point.current.y - y) ** 2,
      );
      return previouDistance.current;
    }, [point]);

    const scale = useComputedValue(() => {
      return interpolate(
        distance.current * progress.current,
        [0, MAX_DISTANCE / 2],
        [1, 0],
        Extrapolate.CLAMP,
      );
    }, [distance, progress]);

    const transform = useComputedValue(() => {
      return [{ scale: scale.current }];
    }, [scale]);

    const origin = useComputedValue(() => {
      if (point.current == null) {
        return previousTouchedPoint.current;
      }
      previousTouchedPoint.current = point.current;
      return previousTouchedPoint.current;
    }, [point]);

    return (
      <Group origin={origin} transform={transform}>
        <RoundedRect {...props} r={4} />
      </Group>
    );
  },
);

RoundedItem.displayName = "RoundedItem";
