import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "../utils/tw";

interface HealthCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  onPress: () => void;
}

const HealthCard: React.FC<HealthCardProps> = ({
  title,
  value,
  unit,
  icon,
  iconColor,
  iconBgColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        tw`bg-white rounded-xl p-4 mb-3 flex-row items-center`,
        styles.cardShadow,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          tw`w-12 h-12 rounded-full items-center justify-center mr-3`,
          { backgroundColor: iconBgColor },
        ]}
      >
        <Icon name={icon} size={24} color={iconColor} />
      </View>

      <View style={tw`flex-1`}>
        <Text style={tw`text-gray-500 text-sm`}>{title}</Text>
        <View style={tw`flex-row items-end`}>
          <Text style={tw`text-gray-800 text-xl font-bold`}>{value}</Text>
          <Text style={tw`text-gray-500 text-sm ml-1`}>{unit}</Text>
        </View>
      </View>

      <Icon name="chevron-forward" size={20} color="#CBD5E0" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default HealthCard;
