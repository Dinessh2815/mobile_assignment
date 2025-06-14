import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { login } from "../utils/auth";
import tw from "../utils/tw";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigation.replace("Home");
      } else {
        Alert.alert("Login Failed", result.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        {" "}
        <View style={tw`flex-1 bg-white p-6 justify-center`}>
          <View style={tw`mb-8 items-center`}>
            <Text style={tw`text-3xl font-bold text-primary mb-2`}>
              Welcome Back
            </Text>
            <Text style={tw`text-gray-500`}>Sign in to continue</Text>
          </View>

          <View>
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 mb-1 font-medium`}>Email</Text>{" "}
              <TextInput
                style={tw`bg-gray-100 rounded-lg p-4 text-gray-800`}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                accessibilityLabel="Email input field"
                returnKeyType="next"
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 mb-1 font-medium`}>Password</Text>{" "}
              <TextInput
                style={tw`bg-gray-100 rounded-lg p-4 text-gray-800`}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                accessibilityLabel="Password input field"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>
          </View>
          <TouchableOpacity
            style={tw`mt-8 rounded-lg p-4 items-center ${
              isLoading ? "bg-gray-400" : "bg-primary"
            }`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={tw`text-white font-bold text-lg`}>
              {isLoading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
