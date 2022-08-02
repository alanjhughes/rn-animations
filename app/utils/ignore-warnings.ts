import { LogBox } from "react-native";

LogBox.ignoreLogs([
  /Require cycle/,
  /Seems like you're using an old API with gesture components/,
  /Bridge was already shutdown/,
  /Setting a timer/,
  /message/,
]);
