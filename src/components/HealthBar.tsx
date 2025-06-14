import React from "react";
import { View, Text } from "react-native";
import Svg, { Rect, Defs, LinearGradient, Stop, Path } from "react-native-svg";
import tw from "../utils/tw";

interface HealthBarProps {
  score: number;
  min?: number;
  max?: number;
}

const BAR_WIDTH = 345;
const POINTER_WIDTH = 20;

const HealthBar: React.FC<HealthBarProps> = ({
  score,
  min = 0,
  max = 3000,
}) => {
  // Clamp score
  const clampedScore = Math.max(min, Math.min(score, max));
  // Calculate pointer position
  const pointerX =
    ((clampedScore - min) / (max - min)) * BAR_WIDTH - POINTER_WIDTH / 2;

  return (    <View style={tw`items-center mt-6`}>
      <View
        style={[tw`items-center relative`, { width: BAR_WIDTH }]}
      >
        {/* Pointer */}
        <View
          style={[tw`absolute -top-[18px] z-10`, { left: pointerX }]}
        >
          <Svg width={20} height={11} viewBox="0 0 20 11" fill="none">
            <Path
              d="M10 11L0.473721 0.499998L19.5263 0.5L10 11Z"
              fill="#91DE86"
            />
          </Svg>
        </View>
        {/* Health Bar */}
        <Svg
          width={BAR_WIDTH}
          height={15}
          viewBox={`0 0 ${BAR_WIDTH} 15`}
          fill="none"
        >
          <Defs>
            <LinearGradient
              id="barGradient"
              x1="7.5"
              y1="7.5"
              x2="321"
              y2="7.5"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="#FF8090" />
              <Stop offset="0.525" stopColor="#FFDA68" />
              <Stop offset="1" stopColor="#75DE8D" />
            </LinearGradient>
          </Defs>
          <Rect
            width={BAR_WIDTH}
            height={15}
            rx={7.5}
            fill="url(#barGradient)"
          />
        </Svg>
        {/* Labels */}        <View
          style={[tw`flex-row justify-between mt-1`, { width: BAR_WIDTH }]}
        >
          {[0, 600, 1200, 1800, 2400, 3000].map((val) => (
            <Text key={val} style={tw`text-[#D5D8FF] text-xs`}>
              {val}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HealthBar;
