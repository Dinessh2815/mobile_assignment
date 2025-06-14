import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";

// Import SVG files directly
import HomeSelected from "../assets/HomeTab-Selected.svg";
import HomeNotSelected from "../assets/HomeTab-notSelected.svg";
import AccountSelected from "../assets/AccountTab-Selected.svg";
import AccountNotSelected from "../assets/AccountTab-notSelected.svg";

const Tab = createBottomTabNavigator();

type TabIconProps = {
  focused: boolean;
};

const HomeTabIcon = ({ focused }: TabIconProps) =>
  focused ? (
    <HomeSelected width={38} height={38} />
  ) : (
    <HomeNotSelected width={38} height={38} />
  );

const AccountTabIcon = ({ focused }: TabIconProps) =>
  focused ? (
    <AccountSelected width={42} height={42} />
  ) : (
    <AccountNotSelected width={42} height={42} />
  );

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 60,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        position: "absolute",
        overflow: "hidden",
        paddingTop: 5,
      },
      tabBarItemStyle: {
        padding: 5,
      },
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => <HomeTabIcon focused={focused} />,
      }}
    />
    <Tab.Screen
      name="AccountTab"
      component={AccountScreen}
      options={{
        tabBarIcon: ({ focused }) => <AccountTabIcon focused={focused} />,
      }}
    />
  </Tab.Navigator>
);

export default MainTabs;
