import * as Font from "expo-font";

export const initFonts = async () => {
  await Font.loadAsync({
    Gabriela: require("assets/fonts/GabrielaStencil-Bold.ttf"),
  });
};
