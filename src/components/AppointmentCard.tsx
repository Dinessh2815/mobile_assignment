import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "../utils/tw";

interface AppointmentCardProps {
  onPress: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`flex-row items-center`,
        {
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
          marginBottom: 16,
        },
      ]}
      activeOpacity={0.85}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <View
            style={{
              backgroundColor: "#3DBB7B",
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 2,
              marginRight: 8,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 13,
                letterSpacing: 0.2,
              }}
            >
              UPCOMING
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={{ color: "#B0B0B0", fontSize: 20, fontWeight: "bold" }}>
            {">"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 17, color: "#222" }}>
              Laurie Simons{" "}
              <Text
                style={{ fontWeight: "normal", color: "#888", fontSize: 15 }}
              >
                MD, DipABLM
              </Text>
            </Text>
            <Text style={{ color: "#888", fontSize: 15, marginTop: 2 }}>
              Internal medicine
            </Text>
            <Text style={{ color: "#888", fontSize: 14, marginTop: 10 }}>
              Thu, December 21, 2024 | 10:00 AM PST
            </Text>
          </View>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={{ width: 48, height: 48, borderRadius: 24, marginLeft: 12 }}
            resizeMode="cover"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentCard;
