import { View, StyleSheet } from "react-native";
import { Screen } from "components/screen/screen";
import LottieView from "lottie-react-native";

interface LottieScreenProps {}

export function LottieScreen({}: LottieScreenProps) {
  return (
    <Screen noSafeArea>
      <View style={styles.container}>
        <LottieView
          autoPlay
          style={{
            width: "100%",
          }}
          source={require("assets/christmas-snowball.json")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
