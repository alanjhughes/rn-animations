import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Screen } from "components/screen/screen";
import { observable } from "@legendapp/state";
import { enableLegendStateReact } from "@legendapp/state/react";

const state = observable({
  user: {
    token: "123",
    name: "John",
    age: 35,
  },
});

class UserTest {
  user: typeof state.user;

  constructor(user: typeof state.user) {
    this.user = user;
  }
}

enableLegendStateReact();

export function LegendStateScreen() {
  const userTest = new UserTest(state.user);

  const setToken = () => {
    state.user.token.set(Math.floor(Math.random() * 1000).toString());
  };

  const setAge = () => {
    state.user.age.set(Math.floor(Math.random() * 100));
  };

  return (
    <Screen>
      <View style={styles.content}>
        <Text>{userTest.user.name}</Text>
        <Text>{userTest.user.token}</Text>
        <Text>{userTest.user.age}</Text>
        <View style={styles.btnContaniner}>
          <TouchableOpacity style={styles.decBtn} onPress={setAge}>
            <Text>Change age</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.incBtn} onPress={setToken}>
            <Text>Set Token</Text>
          </TouchableOpacity>
        </View>
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
  btnContaniner: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  incBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  decBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
});
