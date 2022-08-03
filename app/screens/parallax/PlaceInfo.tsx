import { View, Pressable, Text, StyleSheet } from "react-native";
import { color } from "theme";

interface PlaceInfoProps {
  name: string;
}

export function PlaceInfo({ name }: PlaceInfoProps) {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Text style={styles.features}>FEATURES</Text>
      <Text style={styles.name}>{name}</Text>
      <Pressable style={styles.btn}>
        <Text style={styles.explore}>Explore</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  features: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    opacity: 0.7,
    marginBottom: 10,
  },
  name: {
    fontSize: 42,
    fontFamily: "Gabriela",
    color: "white",
    shadowColor: "#000",
    opacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  btn: {
    backgroundColor: color.dim,
    paddingVertical: 10,
    paddingHorizontal: 20,
    opacity: 0.7,
    marginTop: 20,
  },
  explore: {
    color: "white",
    fontSize: 14,
    fontFamily: "Gabriela",
  },
});
