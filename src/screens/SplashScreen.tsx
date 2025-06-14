import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { getIsLoggedIn, getHealthData } from "../utils/storage";
import tw from "../utils/tw";

// Import the SVG logo
const logoSvg = `<svg width="94" height="90" viewBox="0 0 94 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.9" d="M26.821 89.2462L93.2908 44.3359L63.3713 23.7666L0.265727 88.9427L26.821 89.2462Z" fill="white" fill-opacity="0.7"/>
<path d="M30.0243 0L93.9998 44.2386L65.2308 63.6276L4.00439 0H30.0243Z" fill="white"/>
</svg>`;

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize health data on first launch
      await getHealthData(); // This will set default values if not already set

      // Wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check if the user is logged in
      const isLoggedIn = await getIsLoggedIn();

      // Navigate to the appropriate screen
      if (isLoggedIn) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    };

    initializeApp();
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#204CBB", "#00AB9A"]} // Kept as direct colors for LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.1962, 1]}
      style={tw`flex-1 justify-center items-center`}
    >
      <View style={tw`flex-1 justify-center items-center`}>
        <SvgXml xml={logoSvg} width={93.99984741210938} height={90} />
      </View>

      <View style={tw`pb-8`}>
        <Text style={tw`text-white text-base font-medium tracking-tighter`}>
          Powered by Proactively
        </Text>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;
