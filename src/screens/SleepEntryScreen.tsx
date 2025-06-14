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
import { updateSleep } from "../utils/storage";

type SleepEntryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SleepEntry"
>;

const SleepEntryScreen = () => {
  const navigation = useNavigation<SleepEntryScreenNavigationProp>();
  const [sleep, setSleep] = useState<string>("");

  const handleSave = async () => {
    const sleepNumber = parseFloat(sleep);

    if (isNaN(sleepNumber) || sleepNumber < 0 || sleepNumber > 24) {
      Alert.alert(
        "Invalid Value",
        "Please enter a valid sleep duration between 0 and 24 hours"
      );
      return;
    }

    await updateSleep(sleepNumber);
    Alert.alert(
      "Sleep Data Updated",
      "Your sleep data has been successfully updated",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  const getSleepQuality = (hours: number) => {
    if (hours < 6) return { quality: "Insufficient", color: "#E53E3E" };
    if (hours < 7) return { quality: "Fair", color: "#F6AD55" };
    if (hours <= 9) return { quality: "Good", color: "#38A169" };
    return { quality: "Excessive", color: "#F6AD55" };
  };

  const sleepHours = parseFloat(sleep);
  const sleepQuality = !isNaN(sleepHours) ? getSleepQuality(sleepHours) : null;

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
        <Text style={tw`text-white text-2xl font-bold`}>Update Sleep</Text>
      </View>

      {/* Content */}
      <View style={tw`flex-1 px-4 pt-6`}>
        <Text style={tw`text-gray-600 text-base mb-2`}>
          Hours of Sleep (Daily Average)
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={sleep}
            onChangeText={setSleep}
            placeholder="Enter hours"
            keyboardType="decimal-pad"
            style={styles.input}
          />
          <Text style={styles.unit}>hours</Text>
        </View>

        {sleepQuality && (
          <View style={tw`mt-2 mb-4`}>
            <Text
              style={[
                tw`font-semibold text-base`,
                { color: sleepQuality.color },
              ]}
            >
              {sleepQuality.quality}
            </Text>
          </View>
        )}

        <View style={tw`mt-4`}>
          <Text style={tw`text-gray-500 text-sm`}>
            Recommended sleep: 7 - 9 hours per night
          </Text>
        </View>

        <View style={styles.tipContainer}>
          <Icon name="information-circle-outline" size={24} color="#3182CE" />
          <Text style={styles.tipText}>
            Quality sleep is vital for your physical health, brain function, and
            emotional wellbeing. Consistent sleep patterns help regulate mood,
            improve focus, and strengthen your immune system.
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

export default SleepEntryScreen;
