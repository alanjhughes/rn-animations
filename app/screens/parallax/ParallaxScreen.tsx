import { View, Text, StyleSheet } from "react-native";
import { Screen } from "../../components/screen/screen";

interface ParallaxScreenProps {}

export function ParallaxScreen({}: ParallaxScreenProps) {
  return (
    <Screen noSafeArea>
      <Text>ParallaxScreen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {},
});
