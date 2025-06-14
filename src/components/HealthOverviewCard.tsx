import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
      style={[styles.cardContainer, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={tw`flex-row justify-between items-start`}>
        <Text style={styles.title}>{title}</Text>
        <Icon name="chevron-forward" size={18} color="#718096" />
      </View>

      <Text style={styles.updatedText}>{updatedText}</Text>

      <View style={tw`flex-row items-end mt-2`}>
        <Text style={styles.valueText}>{value}</Text>
        {unit && <Text style={styles.unitText}>{unit}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    minWidth: 130,
    height: 110,
    marginRight: 10,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A202C",
    marginBottom: 4,
  },
  updatedText: {
    fontSize: 12,
    color: "#4A5568",
    opacity: 0.8,
  },
  valueText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 4,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  unitText: {
    fontSize: 12,
    color: "#718096",
    marginLeft: 2,
    marginBottom: 4,
  },
});

export default HealthOverviewCard;
