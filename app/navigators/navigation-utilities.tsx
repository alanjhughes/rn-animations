import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
import {
  createNavigationContainerRef,
  InitialState,
  NavigationState,
  PartialState,
} from "@react-navigation/native";
import { RootNavigatorParamList } from "./types";

export const navigationRef =
  createNavigationContainerRef<RootNavigatorParamList>();

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
) {
  const route = state.routes[state.index || 0];
  if (!route.state) return route.name;
  return getActiveRouteName(route.state);
}

export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }

      const routeName = getActiveRouteName(navigationRef.getRootState());

      if (canExitRef.current(routeName)) {
        BackHandler.exitApp();
        return true;
      }

      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);
}

export function useNavigationPersistence(storage: any, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] =
    useState<InitialState>();
  const [isRestored, setIsRestored] = useState(!__DEV__);

  const routeNameRef = useRef<string | undefined>();

  const onNavigationStateChange = (state: NavigationState | undefined) => {
    if (state) {
      routeNameRef.current = getActiveRouteName(state);
      storage.save(persistenceKey, state);
    }
  };

  const restoreState = useCallback(async () => {
    try {
      const state: NavigationState = await storage.load(persistenceKey);
      if (state) setInitialNavigationState(state);
    } finally {
      setIsRestored(true);
    }
  }, [storage, persistenceKey]);

  useEffect(() => {
    if (!isRestored) restoreState();
  }, [isRestored, restoreState]);

  return {
    onNavigationStateChange,
    restoreState,
    isRestored,
    initialNavigationState,
  };
}

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot({ routes: [{ name, params }] });
    navigationRef.navigate(name as never, params as never);
  }
}

export function resetNav(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot({ index: 0, routes: [{ name, params }] });
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(params = { index: 0, routes: [] }) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params);
  }
}
