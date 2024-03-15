import { View, Image, StyleSheet, Dimensions, StatusBar } from "react-native";
import { Screen } from "components/screen";
import { imageUrls } from "./data";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { BgImage } from "./BgImage";

const { width, height } = Dimensions.get("screen");

const imageW = width * 0.75;
const imageH = imageW * 1.54;

interface CarouselScreenProps {}

export function CarouselScreen({}: CarouselScreenProps) {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <Screen noSafeArea backgroundColor="black">
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {imageUrls.map((url, index) => (
          <BgImage key={index} index={index} scrollX={scrollX} uri={url} />
        ))}
      </View>
      <Animated.FlatList
        data={imageUrls}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => `item-${index}`}
        snapToInterval={width}
        horizontal
        decelerationRate="fast"
        pagingEnabled
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: imageW,
    height: imageH,
    borderRadius: 10,
  },
  imageContainer: {
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
  },
  item: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
});
