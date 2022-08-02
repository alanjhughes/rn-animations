import { Image, Dimensions, StyleSheet } from "react-native";
import { Screen } from "components/screen/screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { UserItem, SPACING } from "./UserItem";
import { data } from "data/userList/data";

const { width, height } = Dimensions.get("screen");

interface ListAnimationProps {}

export function ListAnimationScreen({}: ListAnimationProps) {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll(event) {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Screen noSafeArea>
      <Image
        source={require("assets/bgImage.jpeg")}
        style={{ width, height, ...StyleSheet.absoluteFillObject }}
        blurRadius={15}
      />
      <Animated.FlatList
        data={data}
        contentContainerStyle={{ padding: SPACING, paddingTop: insets.top }}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <UserItem item={item} index={index} scrollY={scrollY} />
        )}
      />
    </Screen>
  );
}
