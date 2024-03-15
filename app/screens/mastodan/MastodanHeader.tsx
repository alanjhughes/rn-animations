import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
  useAnimatedProps,
  SharedValue,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { faker } from "@faker-js/faker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const avatar = faker.image.avatar();

interface MastodanHeaderProps {
  offsetY: SharedValue<number>;
  onBack: () => void;
}

export function MastodanHeader({ offsetY, onBack }: MastodanHeaderProps) {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const animatedProps = useAnimatedProps(() => {
    const blurRadius = interpolate(
      offsetY.value,
      [20, 100],
      [0, 5],
      Extrapolation.CLAMP,
    );

    return {
      blurRadius,
    };
  });

  const bgImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(offsetY.value, [0, -1], [1, 1.01], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.EXTEND,
    });

    const height = interpolate(
      offsetY.value,
      [0, 100],
      [220, 90],
      Extrapolation.CLAMP,
    );

    return {
      height,
      top: 0,
      transform: [{ scale }],
    };
  });

  const animatedAvatar = useAnimatedStyle(() => {
    const inputRange = [0, 100];

    const avatarHeight = interpolate(offsetY.value, inputRange, [160, 35], {
      extrapolateLeft: Extrapolation.EXTEND,
      extrapolateRight: Extrapolation.CLAMP,
    });

    const translateY = interpolate(offsetY.value, inputRange, [40, 0], {
      extrapolateLeft: Extrapolation.EXTEND,
      extrapolateRight: Extrapolation.CLAMP,
    });

    const borderWidth = interpolate(
      offsetY.value,
      inputRange,
      [5, 0],
      Extrapolation.CLAMP,
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
    width: 35,
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
