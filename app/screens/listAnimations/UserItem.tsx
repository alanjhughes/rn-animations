import { View, Text, StyleSheet, Image } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { User } from "./ListAnimation.types";

export const SPACING = 10;
const IMAGE_SIZE = 70;
const ITEM_HEIGHT = IMAGE_SIZE + SPACING * 3;

interface UserItemProps {
  item: User;
  index: number;
  scrollY: Animated.SharedValue<number>;
}

export function UserItem({ item, index, scrollY }: UserItemProps) {
  const animatedStyles = useAnimatedStyle(() => {
    const scaleRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 2)];
    const opacityRange = [
      -1,
      0,
      ITEM_HEIGHT * index,
      ITEM_HEIGHT * (index + 1),
    ];

    const scale = interpolate(scrollY.value, scaleRange, [1, 1, 1, 0]);
    const opacity = interpolate(scrollY.value, opacityRange, [1, 1, 1, 0]);

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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
