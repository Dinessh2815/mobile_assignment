import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import tw from "../utils/tw";
import { useNavigation } from "@react-navigation/native";

const AppointmentDetails = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 34,
          paddingHorizontal: 16,
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 28, color: "#222" }}>{"←"}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "#222" }}>
          Appointment details
        </Text>
      </View>
      {/* Status & Avatar */}
      <View style={{ alignItems: "center", marginTop: 32 }}>
        <View
          style={{
            backgroundColor: "#3DBB7B",
            borderRadius: 4,
            paddingHorizontal: 12,
            paddingVertical: 4,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 15,
              letterSpacing: 0.2,
            }}
          >
            UPCOMING
          </Text>
        </View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
          style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 16 }}
          resizeMode="cover"
        />
      </View>
      {/* Details */}
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: "#222",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Your upcoming appointment with
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: "#888",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Laurie Simons, MD, DipABLM
        </Text>
        <View
          style={{
            backgroundColor: "#EDE6F9",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 2,
            marginBottom: 8,
          }}
        >
          <Text style={{ color: "#7B61FF", fontWeight: "bold", fontSize: 15 }}>
            Appointment
          </Text>
        </View>
        <Text style={{ color: "#888", fontSize: 15, textAlign: "center" }}>
          Thu, December 21, 2024 | 10:00 AM PST
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "#E5E5E5",
          marginVertical: 16,
          marginHorizontal: 16,
        }}
      />
      {/* Meeting Link */}
      <View style={{ marginHorizontal: 16 }}>
        <Text
          style={{
            color: "#222",
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 4,
          }}
        >
          Meeting link:
        </Text>
        <Text
          style={{ color: "#888", fontSize: 15 }}
          selectable
          onPress={() =>
            Linking.openURL("https://www.meet.google.com/abc-defa-dwa")
          }
        >
          www.meet.google.com/abc-defa-dwa
        </Text>
      </View>
      {/* Join Meeting Button */}
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 24 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#4285F4",
            borderRadius: 12,
            marginHorizontal: 16,
            paddingVertical: 18,
            alignItems: "center",
          }}
          onPress={() =>
            Linking.openURL("https://www.meet.google.com/abc-defa-dwa")
          }
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Join meeting ↗
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentDetails;
