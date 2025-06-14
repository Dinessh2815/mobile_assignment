import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, User } from "../types";
import { getUserData, clearStorage } from "../utils/storage";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "../utils/tw";

type AccountScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Account"
>;

const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await clearStorage();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`mt-6`} />

      {/* Header */}
      <View style={tw`p-4 flex-row items-center`}>
        <TouchableOpacity onPress={goBack} style={tw`mr-4`}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold`}>Account</Text>
      </View>

      {/* Profile Section */}
      <View style={tw`p-6 flex-row items-center border-b border-gray-200`}>
        <View
          style={tw`w-16 h-16 bg-gray-300 rounded-full justify-center items-center mr-4`}
        >
          <Text style={tw`text-gray-600 font-bold text-xl`}>
            {user?.name.charAt(0) || "U"}
          </Text>
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`text-lg font-bold`}>{user?.name}</Text>
          <Text style={tw`text-gray-500`}>{user?.email}</Text>
        </View>
      </View>

      {/* Sign Out Button */}
      <View style={tw`p-6`}>
        <TouchableOpacity
          style={tw`bg-red-500 rounded-lg py-3 items-center`}
          onPress={handleSignOut}
        >
          <Text style={tw`text-white font-medium text-base`}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
