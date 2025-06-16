import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types";
import { Text, View, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import firebase from "./src/utils/firebase";

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

// Configure how notifications are handled
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Function to register for push notifications
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    console.log("Expo push token:", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  // Configure Android notification channel
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );

  useEffect(() => {
    // Register for push notifications when the app loads
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token ?? ""));

    // Set up notification listeners
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
      console.log("Notification received:", notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification response:", response);
    });

    // Clean up listeners when component unmounts
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);
  // Create a simple debug panel function to display the token
  const DebugPanel = () => {
    if (!__DEV__) return null; // Only show in development mode
    
    return (
      <View 
        style={{ 
          position: 'absolute', 
          bottom: 20, 
          left: 0, 
          right: 0, 
          backgroundColor: 'rgba(0,0,0,0.7)', 
          padding: 10,
          zIndex: 9999
        }}
      >
        <Text style={{ color: 'white', fontSize: 12 }}>
          Expo Push Token: {expoPushToken ? expoPushToken : 'Loading...'}
        </Text>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {DebugPanel()}
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
