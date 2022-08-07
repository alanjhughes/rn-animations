import { GestureHandlerRootView } from "react-native-gesture-handler";
import Root from "./app/root";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Root />
    </GestureHandlerRootView>
  );
}
