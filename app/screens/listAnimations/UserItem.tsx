import { View, Text, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { User } from "./ListAnimation.types";

export const SPACING = 10;
const IMAGE_SIZE = 70;
const ITEM_HEIGHT = IMAGE_SIZE + SPACING * 3;

interface UserItemProps {
  item: User;
  index: number;
  scrollY: SharedValue<number>;
}

export function UserItem({ item, index, scrollY }: UserItemProps) {
  const animatedStyles = useAnimatedStyle(() => {
    const inputRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 1)];
    const outputRange = [1, 1, 1, 0];

    const scale = interpolate(scrollY.value, inputRange, outputRange);
    const opacity = interpolate(scrollY.value, inputRange, outputRange);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[styles.item, animatedStyles]}>
      <Image
        source={{ uri: item.avatar }}
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          borderRadius: IMAGE_SIZE / 2,
          borderWidth: 1,
          borderColor: "white",
        }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ fontSize: 16 }}>{item.jobTitle}</Text>
        <Text style={{ fontSize: 14, color: "#0099cc" }}>{item.email}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    flexDirection: "row",
    padding: SPACING,
    marginHorizontal: SPACING,
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.7)",
    borderWidth: 1,
    marginBottom: SPACING,
    alignItems: "center",
  },
});
