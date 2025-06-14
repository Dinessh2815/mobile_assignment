import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "../utils/tw";
import { updateSteps, getHealthData } from "../utils/storage";

type StepsEntryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StepsEntry"
>;

const StepsEntryScreen = () => {
  const navigation = useNavigation<StepsEntryScreenNavigationProp>();
  const [steps, setSteps] = useState<string>("");

  const handleSave = async () => {
    const stepsNumber = parseInt(steps);

    if (isNaN(stepsNumber) || stepsNumber < 0) {
      Alert.alert("Invalid Value", "Please enter a valid number of steps");
      return;
    }

    await updateSteps(stepsNumber);
    Alert.alert(
      "Steps Updated",
      "Your steps data has been successfully updated",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`bg-blue-600 pt-12 pb-6 px-4`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`flex-row items-center mb-4`}
        >
          <Icon name="arrow-back" size={24} color="white" />
          <Text style={tw`text-white text-lg ml-2`}>Back</Text>
        </TouchableOpacity>
        <Text style={tw`text-white text-2xl font-bold`}>Update Steps</Text>
      </View>

      {/* Content */}
      <View style={tw`flex-1 px-4 pt-6`}>
        <Text style={tw`text-gray-600 text-base mb-2`}>Daily Steps</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={steps}
            onChangeText={setSteps}
            placeholder="Enter steps"
            keyboardType="number-pad"
            style={styles.input}
          />
          <Text style={styles.unit}>steps</Text>
        </View>

        <View style={tw`mt-4`}>
          <Text style={tw`text-gray-500 text-sm`}>
            Recommended daily steps: 8,000 - 10,000 steps
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Icon name="information-circle-outline" size={24} color="#3182CE" />
          <Text style={styles.tipText}>
            Walking 10,000 steps a day has been shown to have significant health
            benefits, including improved cardiovascular health, weight
            management, and mental wellbeing.
          </Text>
        </View>

        <View style={tw`flex-1 justify-end pb-8`}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E0",
    paddingVertical: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
  },
  unit: {
    fontSize: 16,
    color: "#A0AEC0",
    marginLeft: 8,
  },
  tipContainer: {
    flexDirection: "row",
    backgroundColor: "#EBF8FF",
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  tipText: {
    flex: 1,
    color: "#2C5282",
    marginLeft: 12,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#3D53B6",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StepsEntryScreen;
