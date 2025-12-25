import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/onboarding/Button";

export default function ConnectNotificationsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 100,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-8 text-center">
          Connect your Notifications
        </Text>

        {/* Diagram Container */}
        <View className="items-center justify-center mb-8">
          <View className="relative w-full h-64">
            {/* Logo Box (Bottom Left) */}
            <View
              className="absolute bg-gray-200 rounded-lg p-4 items-center justify-center"
              style={{
                left: "10%",
                bottom: "20%",
                width: 100,
                height: 80,
              }}
            >
              <Text className="text-gray-900 font-semibold">Logo</Text>
            </View>

            {/* Apple Notis Box (Top Right) */}
            <View
              className="absolute bg-gray-200 rounded-lg p-4 items-center justify-center"
              style={{
                right: "10%",
                top: "20%",
                width: 100,
                height: 80,
              }}
            >
              <Text className="text-gray-900 font-semibold">Apple Notis</Text>
            </View>

            {/* Diagonal Connection Line */}
            <View
              className="absolute bg-gray-900"
              style={{
                left: "35%",
                top: "45%",
                width: "30%",
                height: 3,
                transform: [{ rotate: "-45deg" }],
                transformOrigin: "center",
              }}
            />
          </View>
        </View>

        {/* Description Text */}
        <Text className="text-base text-gray-600 mb-8 text-center leading-6">
          Sync your notifications with Capto to ensure you are always getting
          reminders to input your daily teachings
        </Text>

        {/* Continue Button */}
        <View className="mb-4">
          <Button
            text="Continue"
            onPress={() => {
              router.push("/give-rating");
            }}
          />
        </View>

        {/* Not Now Link */}
        <TouchableOpacity
          onPress={() => {
            // Skip notification setup
            router.push("/give-rating");
          }}
          className="items-center py-4"
        >
          <Text className="text-gray-600 text-base">Not Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
