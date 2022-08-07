import { View, StyleSheet } from "react-native";
import { Screen } from "components/screen/screen";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface DragGestureScreenProps {}

export function DragGestureScreen({}: DragGestureScreenProps) {
  const start = useSharedValue({ x: 0, y: 0 });
  const offset = useSharedValue({ x: 0, y: 0 });
  const pressed = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      offset.value = { x: 0, y: 0 };
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(offset.value.x) },
        { translateY: withSpring(offset.value.y) },
        { scale: withSpring(pressed.value ? 1.2 : 1) },
      ],
      backgroundColor: pressed.value ? "red" : "blue",
    };
  });

  return (
    <Screen noSafeArea>
      <View style={styles.content}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.dot, animatedStyle]} />
        </GestureDetector>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
