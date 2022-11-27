import { Platform, ScrollView, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isNonScrolling, presets } from "./screen.presets";
import { ScreenProps } from "./screen.props";

const ios = Platform.OS === "ios";
const defaultStatusBar = ios ? "dark-content" : "light-content";

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const insetStyle = { paddingTop: props.noSafeArea ? 0 : insets.top };

  return (
    <View style={[preset.outer, backgroundStyle]}>
      <StatusBar barStyle={props.statusBar || defaultStatusBar} />
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </View>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const insetStyle = { paddingTop: props.noSafeArea ? 0 : insets.top };

  return (
    <View style={[preset.outer, backgroundStyle]}>
      <StatusBar barStyle={props.statusBar || defaultStatusBar} />
      <ScrollView
        style={[preset.outer, backgroundStyle, insetStyle]}
        contentContainerStyle={[preset.inner, style]}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
      >
        {props.children}
      </ScrollView>
    </View>
  );
}

export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
