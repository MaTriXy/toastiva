"use client";

import "@/lib/rn-globals";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastivaMode, ToastivaProvider } from "toastiva";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastivaProvider
          duration={5000}
          visibleToasts={3}
          gap={14}
          expandedWidth={344}
          showProgress={false}
          horizontalInset={20}
          offset={14}
          springConfig={{
            damping: 20,
            stiffness: 120,
            mass: 1,
          }}
          mode={ToastivaMode.Morph}
          swipeToDismiss
          showTimestamp={false}
        >
          {children}
        </ToastivaProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
