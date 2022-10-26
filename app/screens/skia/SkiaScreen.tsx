import {
  Canvas,
  Group,
  LinearGradient,
  runTiming,
  SweepGradient,
  useTouchHandler,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { Screen } from "components/screen/screen";
import {} from "react-native-reanimated";
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
import { color } from "theme";

interface SkiaScreenProps {}

export function SkiaScreen({}: SkiaScreenProps) {
  const touchedPoint = useValue<{ x: number; y: number } | null>(null);

  const progress = useValue(0);

  const onTouch = useTouchHandler({
    onStart: e => {
      runTiming(progress, 1, { duration: 300 });
      touchedPoint.current = { x: e.x, y: e.y };
    },
    onActive: e => {
      touchedPoint.current = { x: e.x, y: e.y };
    },
    onEnd: () => {
      runTiming(progress, 0, { duration: 300 });
      touchedPoint.current = null;
    },
  });

  return (
    <Screen noSafeArea>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <Canvas style={styles.canvas} onTouch={onTouch}>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  canvas: {
    height: CANVAS_HEIGHT,
    width: SCREEN_WIDTH,
  },
});
