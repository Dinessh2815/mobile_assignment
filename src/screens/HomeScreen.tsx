import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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
import TodoList from "../components/TodoList";

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
        {/* Hero Section with Header and Main Content */}{" "}
        <View style={tw`w-full bg-[#3D53B6] h-[389px] mt-[30px]`}>
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
          </View>{" "}
          <View style={tw`flex-col gap-[30px]`}>
            <View>
              <Text
                style={tw`text-[#D5D8FF] w-[110px] h-[29px] text-base text-center leading-[19px] left-[10px] top-[10px]`}
              >
                Health Score
              </Text>
            </View>
            <View>
              <Text
                style={tw`text-white w-[110px] h-[48px] text-[40px] font-bold text-center tracking-tighter left-[10px] top-[10px]`}
              >
                2,740
              </Text>

              <Text style={tw`text-[#D5D8FF] left-[10px] top-[20px]`}>
                This score is for information purposes only.
              </Text>
            </View>
            <View></View>
          </View>{" "}
          <View style={tw`items-center mt-6`}>
            {/* Health Bar with Pointer */}
            <HealthBar score={2740} />
          </View>
        </View>
        {/* Main Content Section */}{" "}
        <View style={tw`flex-1 bg-white rounded-t-2xl -mt-2.5 p-5 shadow`}>
          {" "}
          <AppointmentCard
            onPress={() => navigation.navigate("AppointmentDetails")}
          />
          {/* Health Overview Section */}
          <View style={tw`mt-6`}>
            <Text style={tw`text-gray-800 text-xl font-bold mb-4`}>
              Health Overview
            </Text>{" "}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`flex-row pr-5`}
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
          {/* Todo List Section */}
          <View style={tw`mt-6 mb-16`}>
            {" "}
            {/* Increased bottom margin for better spacing */}
            <TodoList />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
