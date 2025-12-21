import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import Button from "@/components/onboarding/Button";

export default function CreateAccountScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/hear-about-us");
  };

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
          Create an account with Google or Apple to get started
        </Text>
      </ScrollView>
      <View className="flex-1 pt-10 pb-10 px-4">
        <Button
          text="Sign in with Apple"
          className="mt-8 bg-black rounded-3xl border  border-gray-300"
          onPress={() => {}}
          textColor="text-white"
        />
        <Button
          text="Sign in with Google"
          className="mt-8 bg-transparent rounded-3xl border border-gray-300"
          onPress={() => {}}
          textColor="text-black"
        />
      </View>
      <ScrollView className="flex-1 pt-10 pb-10 px-4">
        <Button text="Continue" className="mt-10" onPress={handleContinue} />
      </ScrollView>
    </View>
  );
}
