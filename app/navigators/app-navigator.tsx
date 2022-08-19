import React, { ComponentProps } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import { RootNavigatorParamList } from "./types";
import {
  RootScreen,
  AnimatedSensor,
  ParallaxScreen,
  ListAnimationScreen,
} from "screens";
import { DragGestureScreen } from "screens/drag/DragGestureScreen";
import { SkiaScreen } from "screens/skia/SkiaScreen";

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="screens"
    >
      <Stack.Screen
        name="screens"
        options={{ title: "Screens", headerShown: true }}
        component={RootScreen}
      />
      <Stack.Screen name="listAnimation" component={ListAnimationScreen} />
      <Stack.Screen name="sensor" component={AnimatedSensor} />
      <Stack.Screen name="drag" component={DragGestureScreen} />
      <Stack.Screen name="parallax" component={ParallaxScreen} />
      <Stack.Screen name="skia" component={SkiaScreen} />
    </Stack.Navigator>
  );
}

interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  useBackButtonHandler(canExit);

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = "AppNavigator";

const exitRoutes = ["landing"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
