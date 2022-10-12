import { Image, Dimensions, StyleSheet, Platform } from "react-native";
import { Screen } from "components/screen/screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { UserItem, SPACING } from "./UserItem";
import { data } from "data/userList/data";
import { FlashList } from "@shopify/flash-list";
import { User } from "./ListAnimation.types";

const { width, height } = Dimensions.get("screen");

const AnimatedList = Animated.createAnimatedComponent(
  FlashList<typeof data[0]>,
);

interface ListAnimationProps {}

export function ListAnimationScreen({}: ListAnimationProps) {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll(event) {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <UserItem item={item} scrollY={scrollY} index={index} />
  );

  return (
    <Screen noSafeArea>
      <Image
        source={require("assets/bgImage.jpeg")}
        style={{ width, height, ...StyleSheet.absoluteFillObject }}
        blurRadius={15}
      />
      <AnimatedList
        data={data}
        estimatedItemSize={100}
        contentContainerStyle={{
          paddingTop: Platform.OS === "ios" ? insets.top : SPACING,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : SPACING,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={renderItem}
      />
    </Screen>
  );
}
