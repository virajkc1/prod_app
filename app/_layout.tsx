import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          // Global styles for all screens
          headerStyle: {
            backgroundColor: "#6366f1", // Purple background
          },
          headerTintColor: "#fff", // White text
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerShadowVisible: false, // Remove shadow
        }}
      >
        <Stack.Screen
          name="(onboarding)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
