import { Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Screen } from "components/screen/screen";
import { RootNavigatorParamList, RootStackNavProps } from "navigators/types";
import { FontAwesome5 } from "@expo/vector-icons";

type Screen = {
  route: keyof RootNavigatorParamList;
  displayName: string;
};

const screens: Screen[] = [
  { route: "listAnimation", displayName: "List Animation" },
  { route: "sensor", displayName: "Animated Sensor" },
  { route: "parallax", displayName: "Parallax" },
  { route: "drag", displayName: "Drag Gesture" },
  { route: "skia", displayName: "Skia" },
];

interface RootScreenProps extends RootStackNavProps<"screens"> {}

export function RootScreen({ navigation }: RootScreenProps) {
  return (
    <Screen noSafeArea>
      <FlatList
        data={screens}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={item => `navitem-${item.route}`}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate(item.route)}
          >
            <Text style={styles.text}>{item.displayName}</Text>
            <FontAwesome5 name="hand-point-right" size={24} color="black" />
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 6,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
  },
});
