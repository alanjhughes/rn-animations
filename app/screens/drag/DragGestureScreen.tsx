import { View, Text, StyleSheet } from "react-native";
import { Screen } from "components/screen/screen";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface DragGestureScreenProps {}

export function DragGestureScreen({}: DragGestureScreenProps) {
  const start = useSharedValue({ x: 0, y: 0 });
  const offset = useSharedValue({ x: 0, y: 0 });
  const gesture = Gesture.Pan()
    .onBegin(event => {
      start.value = { x: event.translationX, y: event.translationY };
    })
    .onChange(event => {
      offset.value = { x: event.translationX, y: event.translationY };
    })
    .onEnd(() => {
      offset.value = { x: start.value.x, y: start.value.y };
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
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
    backgroundColor: "black",
  },
});
