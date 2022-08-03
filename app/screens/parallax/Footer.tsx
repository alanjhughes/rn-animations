import { View, StyleSheet } from "react-native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

interface FooterProps {}

export function Footer({}: FooterProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="home-outline" size={26} color="white" />
      <AntDesign name="hearto" size={26} color="white" />
      <Entypo name="magnifying-glass" size={26} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
