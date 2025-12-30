import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/onboarding/Button";
import { Image } from "react-native";

export default function LongTermMemoryScreen() {
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
              style={{ width: "48%" }}
            />
          </View>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-4">
          Capto builds long term memory
        </Text>

        {/* Card */}
        <View className="flex-1 items-center justify-center mb-8">
          <Image
            source={require("@/assets/images/capto-long-term.png")}
            style={{
              width: "100%",
              height: 300,
              resizeMode: "cover",
            }}
          />
        </View>

        {/* Continue Button */}
        <View className="absolute bottom-10 left-5 right-5">
          <Button
            text="Continue"
            className="bg-blue-500"
            textColor="text-white"
            onPress={() => {
              router.push("/connect-notifications");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
