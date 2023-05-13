import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutRectangle,
  useWindowDimensions,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tabs } from "./data";

const PADDING = 20;

interface TabBarProps {
  offset: SharedValue<number>;
}

export function TabBar({ offset }: TabBarProps) {
  const { top } = useSafeAreaInsets();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [tabDimensions, setTabDimensions] = useState<LayoutRectangle[]>([]);

  const animatedStyle = useAnimatedStyle(() => {
    if (tabDimensions.length !== tabs.length) {
      return { width: 1 };
    }

    const inputRange = tabDimensions.map((_, index) => index);

    if (inputRange.length !== 4) {
      return { width: 1 };
    }

    const width = interpolate(
      offset.value,
      inputRange,
      tabDimensions.map(tab => tab.width),
    );

    const translateX =
      interpolate(
        offset.value,
        inputRange,
        tabDimensions.map(tab => tab.x),
      ) - PADDING;

    return {
      width,
      transform: [{ translateX }],
    };
  });

  return (
    <View style={[styles.tabBar, { top, width: SCREEN_WIDTH }]}>
      {tabs.map((tab, index) => (
        <Text
          onLayout={e => {
            const temp = [...tabDimensions];
            temp[index] = e.nativeEvent.layout;
            setTabDimensions(temp);
          }}
          key={index}
          style={styles.tab}
        >
          {tab.name}
        </Text>
      ))}
      <Animated.View style={[styles.indicator, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  tab: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  indicator: {
    height: 4,
    backgroundColor: "white",
    position: "absolute",
    bottom: -10,
    left: 20,
    borderRadius: 3,
  },
});
