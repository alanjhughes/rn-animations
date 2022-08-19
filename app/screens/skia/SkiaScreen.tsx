import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { StyleSheet } from "react-native";
import { Screen } from "components/screen/screen";

interface SkiaScreenProps {}

export function SkiaScreen({}: SkiaScreenProps) {
  const size = 256;
  const r = size * 0.33;
  return (
    <Screen noSafeArea>
      <Canvas style={styles.canvas}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={size - r} cy={r} r={r} color="magenta" />
          <Circle cx={size / 2} cy={size - r} r={r} color="yellow" />
        </Group>
      </Canvas>
    </Screen>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});
