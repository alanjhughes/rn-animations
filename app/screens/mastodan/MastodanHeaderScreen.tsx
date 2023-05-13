import { View } from "react-native";
import { Screen } from "components/screen";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { RootStackNavProps } from "navigators/types";
import { MastodanHeader } from "./MastodanHeader";
import { useCallback } from "react";

interface MastodanHeaderProps extends RootStackNavProps<"mastodan"> {}

export function MastodanHeaderScreen({ navigation }: MastodanHeaderProps) {
  const offsetY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    offsetY.value = event.contentOffset.y;
  });

  const onBack = useCallback(() => navigation.pop(), [navigation]);

  return (
    <Screen noSafeArea backgroundColor="#333436">
      <StatusBar hidden />
      <MastodanHeader offsetY={offsetY} onBack={onBack} />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {new Array(20).fill(0).map((_, index) => (
          <View key={index} style={{ height: 200 }} />
        ))}
      </Animated.ScrollView>
    </Screen>
  );
}
