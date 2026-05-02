import React from "react";
import { Pressable, Text, View } from "react-native";
import { toastiva } from "toastiva";

const button = {
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 8,
  backgroundColor: "#1f2937",
} as const;

const buttonText = { color: "#fff", fontWeight: "600" } as const;

export default function Index() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 12,
        padding: 16,
      }}
    >
      <Pressable
        style={button}
        onPress={() =>
          toastiva.success('normal toast with "success" variant', {
            description: "This is a description for the success toast",
          })
        }
      >
        <Text style={buttonText}>Trigger normal (success)</Text>
      </Pressable>

      <Pressable
        style={button}
        onPress={() =>
          toastiva.custom(
            <View style={{ padding: 14, flexDirection: "row", gap: 12 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#22c55e22",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#22c55e", fontSize: 18 }}>✓</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Status set to Active
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
                  You're visible to friends and ready to train.
                </Text>
              </View>
            </View>,
            { showHeader: false },
          )
        }
      >
        <Text style={buttonText}>Trigger custom (showHeader: false)</Text>
      </Pressable>

      <Pressable
        style={button}
        onPress={() =>
          toastiva.custom(
            <View style={{ padding: 14 }}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Custom toast (with default header)
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                showHeader defaults to true — header pill stays visible.
              </Text>
            </View>,
            { title: "Heads up" },
          )
        }
      >
        <Text style={buttonText}>Trigger custom (default header)</Text>
      </Pressable>
    </View>
  );
}
