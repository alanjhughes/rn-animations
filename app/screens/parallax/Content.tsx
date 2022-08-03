import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { cardData } from "./data";
import { PlaceInfo } from "./PlaceInfo";

const { width, height } = Dimensions.get("screen");
const IMAGE_HEIGHT = height * 0.65;
interface ContentProps {}

export function Content({}: ContentProps) {
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10,
  });

  const bgStyle = useAnimatedStyle(() => {
    const x = animatedSensor.sensor.value.qx;
    return {
      transform: [{ translateX: withTiming(x * 120, { duration: 100 }) }],
    };
  });

  const fgStyle = useAnimatedStyle(() => {
    const x = animatedSensor.sensor.value.qx;
    return {
      transform: [{ translateX: withTiming(-x * 50, { duration: 50 }) }],
    };
  });

  return (
    <FlatList
      data={cardData}
      horizontal
      style={{ marginVertical: 20 }}
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      decelerationRate="fast"
      pagingEnabled
      renderItem={({ item }) => {
        return (
          <View style={styles.container}>
            <View style={styles.inner}>
              <PlaceInfo name={item.name} />
              <Animated.Image source={item.bg} style={[styles.bg, bgStyle]} />
              <Animated.Image source={item.fg} style={[styles.fg, fgStyle]} />
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width,
  },
  inner: {
    padding: 10,
    alignItems: "center",
    overflow: "hidden",
    width: width * 0.85,
    height: IMAGE_HEIGHT,
    borderRadius: 20,
    marginTop: 20,
  },
  bg: {
    position: "absolute",
    resizeMode: "cover",
    width: width * 1.2,
    height: IMAGE_HEIGHT,
    zIndex: -10,
    top: 0,
  },
  fg: {
    resizeMode: "cover",
    width,
    height: IMAGE_HEIGHT,
    position: "absolute",
    bottom: 0,
    zIndex: -1,
  },
});
