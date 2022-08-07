import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigatorParamList = {
  screens: undefined;
  listAnimation: undefined;
  sensor: undefined;
  parallax: undefined;
  drag: undefined;
};

export type RootStackNavProps<T extends keyof RootNavigatorParamList> =
  NativeStackScreenProps<RootNavigatorParamList, T>;
