import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { cardData } from "./data";
import { PlaceInfo } from "./PlaceInfo";
import { Image } from "expo-image";

const AnimatedImage = Animated.createAnimatedComponent(Image);

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
      transform: [{ translateX: withTiming(x * 100, { duration: 100 }) }],
    };
  });

  const fgStyle = useAnimatedStyle(() => {
    const x = animatedSensor.sensor.value.qx;
    return {
      transform: [{ translateX: withTiming(-x * 40, { duration: 50 }) }],
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
            <View style={styles.item}>
              <PlaceInfo name={item.name} />
              <AnimatedImage
                source={item.bg}
                style={[styles.bg, bgStyle]}
                resizeMode="stretch"
              />
              <AnimatedImage
                source={item.fg}
                style={[styles.fg, fgStyle]}
                resizeMode="stretch"
              />
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
  item: {
    padding: 10,
    alignItems: "center",
    overflow: "hidden",
    width: width * 0.8,
    height: IMAGE_HEIGHT,
    borderRadius: 20,
    marginTop: 20,
  },
  bg: {
    position: "absolute",
    width: width * 1.2,
    height: IMAGE_HEIGHT,
    zIndex: -10,
  },
  fg: {
    width,
    height: IMAGE_HEIGHT,
    position: "absolute",
    zIndex: -1,
  },
});
