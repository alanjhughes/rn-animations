import { View, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <View style={styles.header}>
      <Feather name="menu" size={20} color="white" />
      <Ionicons name="person-outline" size={20} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
