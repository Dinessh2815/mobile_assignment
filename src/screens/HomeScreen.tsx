import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, User, HealthData } from "../types";
import { getUserData, getHealthData } from "../utils/storage";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "../utils/tw";
import HealthBar from "../components/HealthBar";
import AppointmentCard from "../components/AppointmentCard";
import HealthOverviewCard from "../components/HealthOverviewCard";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [user, setUser] = useState<User | null>(null);
  const [healthData, setHealthData] = useState<HealthData>({
    steps: 0,
    bmi: 0,
    sleep: 0,
  });

  // Load user data once
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
    };

    fetchUserData();
  }, []);

  // Refresh health data each time screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadHealthData = async () => {
        const data = await getHealthData();
        setHealthData(data);
      };

      loadHealthData();
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Hero Section with Header and Main Content */}
        <View
          style={[
            tw`w-full`,
            { backgroundColor: "#3D53B6", height: 389, marginTop: 30 },
          ]}
        >
          {/* Header */}
          <View style={tw`flex-row justify-between items-center p-4`}>
            <View
              style={tw`w-10 h-10 bg-gray-300 rounded-full justify-center items-center`}
            >
              <Text style={tw`text-gray-600 font-bold`}>
                {user?.name.charAt(0) || "U"}
              </Text>
            </View>

            <View>
              <Text style={tw`font-bold text-lg text-white`}>
                {user?.name || "User"}
              </Text>
            </View>

            <TouchableOpacity>
              <Icon name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={[tw`flex-col`, { gap: 30 }]}>
            <View>
              <Text
                style={{
                  color: "#D5D8FF",
                  width: 110,
                  height: 29,
                  fontSize: 16,
                  textAlign: "center",
                  lineHeight: 19,
                  left: 10,
                  top: 10,
                }}
              >
                Health Score
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#FFFFFF",
                  width: 110,
                  height: 48,
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                  letterSpacing: -1,
                  left: 10,
                  top: 10,
                }}
              >
                1,740
              </Text>

              <Text
                style={{
                  color: "#D5D8FF",
                  left: 10,
                  top: 20,
                }}
              >
                This score is for information purposes only.
              </Text>
            </View>
            <View></View>
          </View>
          <View style={{ alignItems: "center", marginTop: 24 }}>
            {/* Health Bar with Pointer */}
            <HealthBar score={1740} />
          </View>
        </View>

        {/* Main Content Section */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            marginTop: -10,
            padding: 20,
            // Optional: add shadow for elevation
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          {" "}
          <AppointmentCard
            onPress={() => navigation.navigate("AppointmentDetails")}
          />
          {/* Health Overview Section */}
          <View style={tw`mt-6`}>
            <Text style={tw`text-gray-800 text-xl font-bold mb-4`}>
              Health Overview
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsContainer}
            >
              {/* Steps Card */}
              <HealthOverviewCard
                title="Steps"
                value={healthData.steps.toLocaleString()}
                updatedText="Updated"
                backgroundColor="#EDF2FF"
                onPress={() => navigation.navigate("StepsEntry")}
              />

              {/* BMI Card */}
              <HealthOverviewCard
                title="BMI"
                value={healthData.bmi.toFixed(2)}
                unit="kg/m²"
                updatedText="Updated"
                backgroundColor="#FFFFF0"
                onPress={() => navigation.navigate("BMIEntry")}
              />

              {/* Sleep Card */}
              <HealthOverviewCard
                title="Sleep"
                value={healthData.sleep.toFixed(1)}
                unit="hours"
                updatedText="Updated"
                backgroundColor="#FFF9E8"
                onPress={() => navigation.navigate("SleepEntry")}
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    paddingRight: 20,
  },
});

export default HomeScreen;
