import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitleEnabled: true,
          headerLargeTitleShadowVisible: true,
          headerTitle: "",
          headerTitleStyle: { color: "#000" },
          headerShown: true,
          freezeOnBlur: true,
          scrollEdgeEffects: { top: "soft" },
        }}
      />
      <Stack.Screen name="success" />
      <Stack.Screen
        name="create-room"
        options={{
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
}
