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
          name="index"
          options={{
            title: "Home",
            // Override global styles for this screen
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="choose-plan"
          options={{
            title: "Choose Plan",
            headerShown: false, // Completely hide header
            // OR customize it:
            // headerStyle: {
            //   backgroundColor: '#8b5cf6',
            // },
            // headerTintColor: '#fff',
            // presentation: 'modal', // Show as modal
          }}
        />
        {/* Create Account Screen */}
        <Stack.Screen
          name="create-account"
          options={{
            title: "Create Account",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="hear-about-us"
          options={{
            title: "Hear About Us",
            // Override global styles for this screen
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="long-term-memory"
          options={{
            title: "Long Term Memory",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="connect-notifications"
          options={{
            title: "Connect Notifications",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="give-rating"
          options={{
            title: "Give Rating",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="free-trial"
          options={{
            title: "Free Trial",
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
