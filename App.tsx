import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types";

// Import screens
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainTabs from "./src/navigation/MainTabs";
import AccountScreen from "./src/screens/AccountScreen";
import AppointmentDetails from "./src/screens/AppointmentDetails";
import StepsEntryScreen from "./src/screens/StepsEntryScreen";
import BMIEntryScreen from "./src/screens/BMIEntryScreen";
import SleepEntryScreen from "./src/screens/SleepEntryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
        <Stack.Screen name="StepsEntry" component={StepsEntryScreen} />
        <Stack.Screen name="BMIEntry" component={BMIEntryScreen} />
        <Stack.Screen name="SleepEntry" component={SleepEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
