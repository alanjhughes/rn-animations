import { View, StyleSheet } from "react-native";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <View style={styles.header}>
      <SimpleLineIcons name="menu" size={24} color="white" />
      <Ionicons name="person-outline" size={24} color="white" />
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
