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
import { updateBMI } from "../utils/storage";

type BMIEntryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BMIEntry"
>;

const BMIEntryScreen = () => {
  const navigation = useNavigation<BMIEntryScreenNavigationProp>();
  const [bmi, setBmi] = useState<string>("");

  const handleSave = async () => {
    const bmiNumber = parseFloat(bmi);

    if (isNaN(bmiNumber) || bmiNumber <= 0 || bmiNumber > 50) {
      Alert.alert(
        "Invalid Value",
        "Please enter a valid BMI value between 1 and 50"
      );
      return;
    }

    await updateBMI(bmiNumber);
    Alert.alert("BMI Updated", "Your BMI data has been successfully updated", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const getBMICategory = (value: number) => {
    if (value < 18.5) return { category: "Underweight", color: "#3182CE" };
    if (value < 24.9) return { category: "Normal", color: "#38A169" };
    if (value < 29.9) return { category: "Overweight", color: "#F6AD55" };
    return { category: "Obese", color: "#E53E3E" };
  };

  const bmiNumber = parseFloat(bmi);
  const bmiCategory = !isNaN(bmiNumber) ? getBMICategory(bmiNumber) : null;

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
        <Text style={tw`text-white text-2xl font-bold`}>Update BMI</Text>
      </View>

      {/* Content */}
      <View style={tw`flex-1 px-4 pt-6`}>
        <Text style={tw`text-gray-600 text-base mb-2`}>
          Body Mass Index (BMI)
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={bmi}
            onChangeText={setBmi}
            placeholder="Enter BMI"
            keyboardType="decimal-pad"
            style={styles.input}
          />
          <Text style={styles.unit}>kg/m²</Text>
        </View>

        {bmiCategory && (
          <View style={tw`mt-2 mb-4`}>
            <Text
              style={[
                tw`font-semibold text-base`,
                { color: bmiCategory.color },
              ]}
            >
              {bmiCategory.category}
            </Text>
          </View>
        )}

        <View style={tw`mt-4`}>
          <Text style={tw`text-gray-500 text-sm`}>
            Normal BMI range: 18.5 - 24.9 kg/m²
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Icon name="information-circle-outline" size={24} color="#3182CE" />
          <Text style={styles.tipText}>
            BMI is a measure of body fat based on height and weight. While it's
            a useful screening tool, BMI doesn't directly measure body fat and
            may not account for all factors affecting your health.
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
    marginBottom: 10,
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

export default BMIEntryScreen;
