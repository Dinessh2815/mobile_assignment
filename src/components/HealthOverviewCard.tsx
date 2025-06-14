import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "../utils/tw";

interface HealthOverviewCardProps {
  title: string;
  value: number | string;
  unit?: string;
  updatedText: string;
  backgroundColor: string;
  onPress: () => void;
}

const HealthOverviewCard: React.FC<HealthOverviewCardProps> = ({
  title,
  value,
  unit,
  updatedText,
  backgroundColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        tw`w-[150px] min-w-[130px] h-[110px] mr-2.5 rounded-2xl py-3 px-3 mb-2.5 shadow overflow-hidden`,
        { backgroundColor },
      ]}
      onPress={onPress}
    >
      <View style={tw`flex-row justify-between items-start`}>
        <Text style={tw`text-base font-medium text-gray-800 mb-1`}>
          {title}
        </Text>
        <Icon name="chevron-forward" size={18} color="#718096" />
      </View>

      <Text style={tw`text-xs text-gray-500 opacity-80`}>{updatedText}</Text>

      <View style={tw`flex-row items-end mt-2`}>
        <Text
          style={tw`text-[22px] font-bold text-gray-800 mt-1 flex-shrink-1 flex-wrap`}
        >
          {value}
        </Text>
        {unit && (
          <Text style={tw`text-xs text-gray-500 ml-0.5 mb-1`}>{unit}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HealthOverviewCard;
