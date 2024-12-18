import { Tabs } from "expo-router";
import React from "react";
import colors from "tailwindcss/colors";

import { Feather } from "@expo/vector-icons";

const tabScreenOptions = {
  tabBarActiveTintColor: colors.black,
  tabBarInactiveTintColor: colors.zinc[400],
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: 60,
  },
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="bell" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}
