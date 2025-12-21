import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/onboarding/Button";
import { useState } from "react";

// How the user heard about this app
type TrafficSource =
  | "X"
  | "Word of Mouth"
  | "Instagram"
  | "TikTok"
  | "Google"
  | "App Store"
  | "Other";

const HearAboutUsScreen = () => {
  // Chosen Traffic Source
  const [selectedTraffic, setSelectedTraffic] = useState<TrafficSource | null>(
    null
  );
  const router = useRouter();
  const traffic = [
    {
      id: "X" as TrafficSource,
    },
    {
      id: "Word of Mouth" as TrafficSource,
    },
    {
      id: "Instagram" as TrafficSource,
    },
    {
      id: "TikTok" as TrafficSource,
    },
    {
      id: "Google" as TrafficSource,
    },
    {
      id: "App Store" as TrafficSource,
    },
    {
      id: "Other" as TrafficSource,
    },
  ];
  return (
    <View className="flex-1 bg-white">
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

        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-2">
          Where did you hear about us?
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-[#6B7280] mb-10">
          Select how you discovered our app
        </Text>

        {/* Traffic Options */}
        <View className="mb-10">
          {traffic.map((t) => {
            const selectedPlan = selectedTraffic === t.id;

            return (
              <TouchableOpacity
                key={t.id}
                onPress={() => setSelectedTraffic(t.id)}
                activeOpacity={0.8}
                className={`rounded-xl border-2 mb-2 p-3 ${
                  selectedPlan
                    ? "border-black bg-black"
                    : "border-gray-200 bg-white"
                }`}
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text
                    className={`text-lg font-bold flex-1 ${selectedPlan ? "text-white" : "text-black"}`}
                  >
                    {t.id}
                  </Text>
                  {/* Radio Button */}
                  <View
                    className={`w-6 h-6 rounded-full border-2 justify-center items-center ${
                      selectedPlan
                        ? "border-white bg-blue-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {selectedPlan && (
                      <View className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <View className="mb-10">
          <Button
            text="Continue"
            onPress={() => {
              router.push("/");
            }}
            disabled={!selectedTraffic}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HearAboutUsScreen;
