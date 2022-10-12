import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { observable } from "@legendapp/state";
import { enableLegendStateReact } from "@legendapp/state/react";
import { Screen } from "components/screen/screen";

enableLegendStateReact();

const state = observable({ count: 0 });

export function LegendStateScreen() {
  useEffect(() => {
    const id = setInterval(() => {
      state.count.set(prev => prev + 1);
    }, 1000);
    return () => {
      clearInterval(id);
      state.count.set(0);
    };
  }, []);

  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.title}>Count</Text>
        <Text style={styles.text}>{state.count}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
  },
  text: {
    fontSize: 32,
    fontWeight: "700",
  },
});
