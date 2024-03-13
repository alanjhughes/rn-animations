import { StyleSheet, View } from "react-native";
import { Canvas, Group, LinearGradient, vec } from "@shopify/react-native-skia";
import { Screen } from "components/screen/screen";
import { color } from "theme";
import {
  CANVAS_HEIGHT,
  PADDING,
  SCREEN_WIDTH,
  SQUARES_HORIZONTAL,
  SQUARES_VERTICAL,
  SQUARE_CONTAINER_SIZE,
  SQUARE_SIZE,
} from "./constants";
import { RoundedItem } from "./RoundedItem";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export function SkiaScreen() {
  const touchedPoint = useSharedValue<{ x: number; y: number } | null>(null);
  const progress = useSharedValue(0);

  const touch = Gesture.Tap().onEnd(() => {
    progress.value = withTiming(0, { duration: 350 });
    touchedPoint.value = null;
  });

  const pan = Gesture.Pan()
    .onBegin(e => {
      progress.value = withTiming(1, { duration: 350 });
      touchedPoint.value = { x: e.x, y: e.y };
    })
    .onChange(e => {
      touchedPoint.value = { x: e.x, y: e.y };
    })
    .onEnd(() => {
      progress.value = withTiming(0, { duration: 350 });
      touchedPoint.value = null;
    });

  const gesture = Gesture.Simultaneous(touch, pan);
  return (
    <Screen noSafeArea>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <Canvas style={styles.canvas}>
            <Group>
              {Array(SQUARES_HORIZONTAL)
                .fill(0)
                .map((_, i) =>
                  Array(SQUARES_VERTICAL)
                    .fill(0)
                    .map((_, j) => (
                      <RoundedItem
                        progress={progress}
                        point={touchedPoint}
                        key={`i${i}-j${j}`}
                        x={i * SQUARE_CONTAINER_SIZE + PADDING / 2}
                        y={j * SQUARE_CONTAINER_SIZE + PADDING / 2}
                        width={SQUARE_SIZE}
                        height={SQUARE_SIZE}
                      />
                    )),
                )}
              <LinearGradient
                start={vec(0, 0)}
                end={vec(SCREEN_WIDTH, CANVAS_HEIGHT)}
                colors={[
                  color.system.systemCyan,
                  color.system.systemYellow,
                  color.system.systemMint,
                  color.system.systemPink,
                  color.system.systemPurple,
                ]}
              />
            </Group>
          </Canvas>
        </View>
      </GestureDetector>
    </Screen>
  );
}

const styles = StyleSheet.create({
  canvas: {
    height: CANVAS_HEIGHT,
    width: SCREEN_WIDTH,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
  },
});
