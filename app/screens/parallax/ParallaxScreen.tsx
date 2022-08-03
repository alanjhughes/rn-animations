import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { color } from "theme";
import { Screen } from "components/screen/screen";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";

interface ParallaxScreenProps {}

export function ParallaxScreen({}: ParallaxScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <Screen
      statusBar="light-content"
      noSafeArea
      style={{ backgroundColor: color.primary }}
    >
      <View style={{ paddingTop: insets.top }}>
        <Header />
        <Text style={styles.title}>Exclusive trips just for you</Text>
        <Content />
        <Footer />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: "white",
    textAlign: "center",
    fontFamily: "Gabriela",
    marginTop: 10,
  },
});
