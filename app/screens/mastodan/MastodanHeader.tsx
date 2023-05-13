import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedProps,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { faker } from "@faker-js/faker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const avatar = faker.image.avatar();

interface MastodanHeaderProps {
  offsetY: Animated.SharedValue<number>;
  onBack: () => void;
}

export function MastodanHeader({ offsetY, onBack }: MastodanHeaderProps) {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const bgImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(offsetY.value, [0, -1], [1, 1.01], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.EXTEND,
    });

    const height = interpolate(
      offsetY.value,
      [0, 100],
      [220, 105],
      Extrapolate.CLAMP,
    );

    return {
      height,
      top: 0,
      transform: [{ scale }],
    };
  });

  const animatedProps = useAnimatedProps(() => {
    const blurRadius = interpolate(
      offsetY.value,
      [0, 100],
      [0, 10],
      Extrapolate.CLAMP,
    );

    return {
      blurRadius,
    };
  });

  const animatedAvatar = useAnimatedStyle(() => {
    const inputRange = [0, 100];

    const avatarHeight = interpolate(offsetY.value, inputRange, [150, 40], {
      extrapolateLeft: Extrapolate.EXTEND,
      extrapolateRight: Extrapolate.CLAMP,
    });

    const translateY = interpolate(offsetY.value, inputRange, [25, 0], {
      extrapolateLeft: Extrapolate.EXTEND,
      extrapolateRight: Extrapolate.CLAMP,
    });

    const borderWidth = interpolate(
      offsetY.value,
      inputRange,
      [5, 0],
      Extrapolate.CLAMP,
    );

    const left = width / 2 - avatarHeight / 2;
    const borderRadius = avatarHeight / 2;

    return {
      height: avatarHeight,
      borderRadius,
      left,
      borderWidth,
      transform: [{ translateY }],
    };
  });

  return (
    <View style={{ width }}>
      <Animated.Image
        source={require("assets/bg.jpg")}
        style={[
          { width, height: 200, position: "absolute", top: 0 },
          bgImageStyle,
        ]}
        animatedProps={animatedProps}
      />
      <View style={[styles.header, { marginTop: top, width }]}>
        <TouchableOpacity style={styles.iconBg} onPress={onBack}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>

        <Animated.Image
          source={{ uri: avatar }}
          style={[styles.avatar, animatedAvatar]}
        />
        <View style={styles.iconBg}>
          <MaterialIcons name="settings" size={24} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  iconBg: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    position: "absolute",
    top: 0,
    borderRadius: 20,
    aspectRatio: 1,
    borderColor: "#333436",
  },
});
