import { View, Text, StyleSheet, Pressable } from "react-native";
import { Screen } from "components/screen";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAnimatedLayout } from "hooks/useAnimatedLayout";

const PADDING = 10;

interface ToggleScreenProps {}

export function ToggleScreen({}: ToggleScreenProps) {
  const selectedTab = useSharedValue<"one" | "two">("one");
  const { width, height, onLayout } = useAnimatedLayout();

  const selectedValue = useDerivedValue(() => {
    return selectedTab.value === "one" ? 1 : 2;
  });

  const animatedContainer = useAnimatedStyle(() => {
    return {
      width: width.value / 2,
      height: height.value - PADDING,
      top: 4,
      transform: [
        {
          translateX: withTiming(
            selectedTab.value === "one" ? PADDING / 2 : 143,
            {
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            },
          ),
        },
      ],
    };
  });

  const textOne = useAnimatedStyle(() => {
    const color = interpolateColor(
      selectedValue.value,
      [1, 2],
      ["white", "black"],
    );
    return {
      color,
    };
  });

  const textTwo = useAnimatedStyle(() => {
    const color = interpolateColor(
      selectedValue.value,
      [2, 1],
      ["white", "black"],
    );
    return {
      color,
    };
  });

  return (
    <Screen backgroundColor="white">
      <View style={styles.container}>
        <Text style={styles.title}>Options:</Text>

        <View style={styles.toggleContainer} onLayout={onLayout}>
          <Animated.View style={[styles.highlightView, animatedContainer]} />
          <Pressable
            style={styles.toggleBtn}
            onPress={() => {
              selectedTab.value = "one";
            }}
          >
            <Animated.Text style={[styles.btnTxt, textOne]}>One</Animated.Text>
          </Pressable>
          <Pressable
            style={styles.toggleBtn}
            onPress={() => {
              selectedTab.value = "two";
            }}
          >
            <Animated.Text style={[styles.btnTxt, textTwo]}>Two</Animated.Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    width: 300,
    height: 50,
    backgroundColor: "#f5f3f2",
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  toggleBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 20,
    color: "white",
  },
  highlightView: {
    position: "absolute",
    backgroundColor: "#040B87",
    borderRadius: 8,
  },
});
