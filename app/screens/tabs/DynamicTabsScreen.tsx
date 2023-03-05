import { Dimensions, StyleSheet, View } from "react-native";
import { Screen } from "components/screen";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { tabs } from "./data";
import { TabBar } from "./TabBar";

const { width, height } = Dimensions.get("screen");

interface DynamicTabsScreenProps {}

export function DynamicTabsScreen({}: DynamicTabsScreenProps) {
  const offset = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      offset.value = event.contentOffset.x / width;
    },
  });

  return (
    <Screen noSafeArea>
      <StatusBar hidden />
      <View style={styles.container}>
        <TabBar offset={offset} />
        <Animated.FlatList
          data={tabs}
          keyExtractor={item => item.name}
          pagingEnabled
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          snapToInterval={width}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <Image source={item.image} style={{ width, height }} />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
