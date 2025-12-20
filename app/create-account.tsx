import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";

export default function CreateAccountScreen() {
  const router = useRouter();

  return (
    <View className="flex-1  p-5 bg-gray-100">
      <ScrollView
        className="flex-1 pt-10 pb-10 px-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity className="mb-8" onPress={() => router.back()}>
          <Text className="text-3xl text-gray-900 font-light">←</Text>
        </TouchableOpacity>
        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-2">
          Create Account
        </Text>
        {/* Subtitle */}
        <Text className="text-base text-[#6B7280] mb-8">
          Enter your email and password to create an account
        </Text>
      </ScrollView>
      <ScrollView className="flex-1 pt-10 pb-10 px-4">
        <TouchableOpacity
          className="px-4 py-3 bg-green-500 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white text-base font-semibold">
            Go Back to Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
