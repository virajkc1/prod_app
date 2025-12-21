import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/onboarding/Button";

export default function LongTermMemoryScreen() {
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
              style={{ width: "85%" }}
            />
          </View>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-8">
          Capto builds long term memory
        </Text>

        {/* Card */}
        <View className="bg-white rounded-xl p-6 mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-6">
            Long Term Memory
          </Text>

          {/* Graph Container */}
          <View className="h-48 mb-4 relative bg-gray-50 rounded-lg p-4">
            {/* Y-axis */}
            <View className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-300" />

            {/* X-axis */}
            <View className="absolute left-4 right-4 bottom-4 h-0.5 bg-gray-300" />

            {/* Graph area with padding */}
            <View
              className="flex-1 relative"
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              {/* Blue line (Capto) - starts high, slight decline */}
              <View
                className="absolute bg-blue-500"
                style={{
                  left: "8%",
                  top: "20%",
                  width: "84%",
                  height: 3,
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  transform: [{ rotate: "-3deg" }],
                }}
              />
              {/* Blue start point */}
              <View
                className="absolute w-3 h-3 rounded-full bg-blue-500 border-2 border-white"
                style={{
                  left: "6%",
                  top: "18%",
                  marginLeft: -6,
                  marginTop: -6,
                }}
              />
              {/* Blue end point */}
              <View
                className="absolute w-3 h-3 rounded-full bg-blue-500 border-2 border-white"
                style={{
                  left: "88%",
                  top: "25%",
                  marginLeft: -6,
                  marginTop: -6,
                }}
              />

              {/* Black line (Traditional) - starts high, sharp decline */}
              <View
                className="absolute bg-gray-900"
                style={{
                  left: "8%",
                  top: "20%",
                  width: "84%",
                  height: 3,
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  transform: [{ rotate: "52deg" }],
                  transformOrigin: "left center",
                }}
              />
              {/* Black start point */}
              <View
                className="absolute w-3 h-3 rounded-full bg-gray-900 border-2 border-white"
                style={{
                  left: "6%",
                  top: "18%",
                  marginLeft: -6,
                  marginTop: -6,
                }}
              />
              {/* Black end point */}
              <View
                className="absolute w-3 h-3 rounded-full bg-gray-900 border-2 border-white"
                style={{
                  left: "88%",
                  top: "82%",
                  marginLeft: -6,
                  marginTop: -6,
                }}
              />
            </View>
          </View>

          {/* Caption */}
          <Text className="text-sm text-gray-500 text-center">
            Based on 85% of user feedback across the past 2 months
          </Text>
        </View>

        {/* Continue Button */}
        <View className="mb-10">
          <Button
            text="Continue"
            onPress={() => {
              router.push("/connect-notifications");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
