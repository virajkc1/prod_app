import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/onboarding/Button";

export default function ConnectNotificationsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 py-10 bg-gray-100">
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
        {/* Back Button */}
        <TouchableOpacity
          className="mb-6 w-10 h-10 justify-center"
          onPress={() => router.back()}
        >
          <Text className="text-3xl text-gray-900 font-light">←</Text>
        </TouchableOpacity>

        {/* Progress Bar */}
        <View className="mb-8">
          <View className="h-2 bg-gray-200 rounded-full">
            <View
              className="h-2 bg-green-500 rounded-full"
              style={{ width: "66%" }}
            />
          </View>
        </View>
        {/* Title */}
        <Text className="text-3xl justify-start font-bold text-black mb-12">
          Connect your Notifications
        </Text>

        {/* Bell Icon */}
        <View className="flex-1 justify-center items-center mb-24">
          <View className="w-64 h-64 rounded-full bg-gray-200/30 items-center justify-center">
            <Image
              source={require("@/assets/images/bell.png")}
              style={{ width: 250, height: 250 }}
              resizeMode="contain"
            />
          </View>
          <Text className="text-xl mt-10 text-gray-600 mb-8 text-center gap-3leading-6">
            Sync your notifications to always get reminders to input your daily
            teachings
          </Text>
        </View>

        {/* Description Text */}

        {/* Continue Button */}
        <View className="absolute bottom-16 left-5 right-5">
          <Button
            text="Continue"
            className="bg-blue-500"
            textColor="text-white"
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
          className="items-center py-4 absolute bottom-0 left-5 right-5"
        >
          <Text className="text-gray-600 text-base">Not Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
