import "expo-dev-client";
import "utils/ignore-warnings";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import * as storage from "utils/storage";
import { AppNavigator, useNavigationPersistence } from "navigators";
import { enableFreeze } from "react-native-screens";
import { useEffect, useState } from "react";
import { initFonts } from "theme/fonts";
import { GestureHandlerRootView } from "react-native-gesture-handler";

enableFreeze(true);

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";

function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initFonts();
      setReady(true);
    })();
  }, []);

  if (!isNavigationStateRestored || !ready) return null;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
