import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="choose-plan"
        options={{
          title: "Choose Plan",
          headerShown: false,
        }}
      />
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
    </Stack>
  );
}
