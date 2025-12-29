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
        <Text className="text-3xl font-bold text-[#111827] mb-8">
          Capto builds long term memory
        </Text>

        {/* Card */}
        <View className="bg-white mt-4 flex-1 items-center justify-center rounded-xl mb-8">
          <Image
            source={require("@/assets/images/capto-long-term.png")}
            style={{ width: "100%", height: 300, resizeMode: "contain" }}
          />
        </View>

        {/* Continue Button */}
        <View className="flex-1 justify-end mb-10">
          <Button
            text="Continue"
            onPress={() => {
              router.push("/connect-notifications");
            }}
            textColor="text-white"
          />
        </View>
      </ScrollView>
    </View>
  );
}
