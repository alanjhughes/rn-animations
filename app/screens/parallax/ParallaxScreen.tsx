import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { color } from "theme";
import { Screen } from "components/screen/screen";
import {
  SimpleLineIcons,
  Ionicons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const IMAGE_HEIGHT = height * 0.7;

interface ParallaxScreenProps {}

export function ParallaxScreen({}: ParallaxScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <Screen noSafeArea style={{ backgroundColor: color.primary }}>
      <View style={{ paddingTop: insets.top }}>
        <View style={styles.header}>
          <SimpleLineIcons name="menu" size={24} color="white" />
          <Ionicons name="person-outline" size={24} color="white" />
        </View>
        <Text style={styles.title}>Exclusive trips just for you</Text>
        <View
          style={{
            alignItems: "center",
            padding: 10,
            overflow: "hidden",
            width: width * 0.85,
            height: IMAGE_HEIGHT,
            borderRadius: 20,
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
                opacity: 0.7,
              }}
            >
              FEATURES
            </Text>
            <Text
              style={{
                fontSize: 42,
                fontFamily: "Gabriela",
                color: "white",
                shadowColor: "#000",
                opacity: 0.7,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowRadius: 10,
                shadowOpacity: 0.3,
              }}
            >
              Brazil
            </Text>
            <Pressable
              style={{
                backgroundColor: color.dim,
                paddingVertical: 10,
                paddingHorizontal: 20,
                opacity: 0.7,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Gabriela",
                }}
              >
                Explore
              </Text>
            </Pressable>
          </View>
          <Image
            source={require("assets/RioBG.jpg")}
            style={{
              position: "absolute",
              resizeMode: "cover",
              width,
              height: IMAGE_HEIGHT,
              zIndex: -1,
            }}
          />
          <Image
            source={require("assets/Rio.png")}
            style={{
              resizeMode: "cover",
              width: width * 0.85,
              height: IMAGE_HEIGHT,
              position: "absolute",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <Ionicons name="home-outline" size={26} color="white" />
          <AntDesign name="hearto" size={26} color="white" />
          <Entypo name="magnifying-glass" size={26} color="white" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontSize: 26,
    color: "white",
    textAlign: "center",
    fontFamily: "Gabriela",
    marginTop: 10,
  },
});
