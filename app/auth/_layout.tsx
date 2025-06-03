import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name={"login"} color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Sign Up",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={"people-alt"} color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
