import { View, StyleSheet } from "react-native";
import { Screen } from "components/screen/screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface AnimatedSensorProps {}

export function AnimatedSensor({}: AnimatedSensorProps) {
  const insets = useSafeAreaInsets();
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10,
  });

  const style = useAnimatedStyle(() => {
    const yaw = Math.abs(animatedSensor.sensor.value.yaw);
    const pitch = Math.abs(animatedSensor.sensor.value.pitch);

    return {
      height: withTiming(yaw * 100 + 20, { duration: 100 }),
      width: withTiming(pitch * 100 + 20, { duration: 100 }),
    };
  });

  return (
    <Screen noSafeArea>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <Animated.View
          style={[style, { backgroundColor: "black", borderRadius: 10 }]}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
