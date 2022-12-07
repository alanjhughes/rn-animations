import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

interface BgImageProps {
  index: number;
  scrollX: Animated.SharedValue<number>;
  uri: string;
}

export function BgImage({ index, scrollX, uri }: BgImageProps) {
  const style = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const opacity = interpolate(scrollX.value, inputRange, [0, 1, 0]);
    return {
      opacity,
    };
  });
  return (
    <Animated.Image
      key={index}
      source={{ uri }}
      style={[StyleSheet.absoluteFillObject, style]}
      blurRadius={10}
    />
  );
}
