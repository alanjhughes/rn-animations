import "expo-dev-client";
import "utils/ignore-warnings";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import * as storage from "utils/storage";
import { AppNavigator, useNavigationPersistence } from "navigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableFreeze } from "react-native-screens";

enableFreeze(true);

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";

function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  if (!isNavigationStateRestored) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppNavigator
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
