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
          headerTitle: "Toastiva",
          headerTitleStyle: { color: "#000" },
          headerShown: true,
          freezeOnBlur: true,
          scrollEdgeEffects: { top: "soft" },
        }}
      />
      <Stack.Screen
        name="check-balance"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBackVisible: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="create-room"
        options={{
          presentation: "formSheet",
        }}
      />

      <Stack.Screen
        name="edit-profile"
        options={{
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
}
