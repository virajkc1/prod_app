import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import Button from "@/components/onboarding/Button";
import { AntDesign } from "@expo/vector-icons";
export default function CreateAccountScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/hear-about-us");
  };

  return (
    <View className="flex-1 py-10 bg-white">
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
              style={{ width: "16%" }}
            />
          </View>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-2">
          Create Account
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-[#6B7280] mb-10">
          Create an account with Google or Apple to get started
        </Text>

        {/* Auth Buttons */}
        <View className="flex-1 justify-center items-center mb-10">
          <View className="w-full max-w-md">
            <Button
              text="Sign in with Apple"
              icon={<AntDesign name="apple" size={20} color="white" />}
              className="mb-3 bg-black rounded-3xl"
              onPress={() => {}}
              textColor="text-white"
            />
            <Button
              icon={
                <Image
                  source={require("@/assets/images/google-icon.png")}
                  style={{ width: 20, height: 20 }}
                />
              }
              text="Sign in with Google"
              className="bg-transparent rounded-3xl border border-gray-300"
              onPress={() => {}}
              textColor="text-black"
            />
          </View>
        </View>
        {/* Continue Button */}
        <View className="absolute bottom-10 left-5 right-5">
          <Button
            text="Continue"
            className="bg-blue-500"
            textColor="text-white"
            onPress={handleContinue}
          />
        </View>
      </ScrollView>
    </View>
  );
}
