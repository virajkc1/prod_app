import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/onboarding/Button";
import { useState } from "react";

type SubscriptionType = "monthly" | "yearly";

export default function FreeTrialScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionType>("yearly");

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
              style={{ width: "95%" }}
            />
          </View>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-8">
          Capto is FREE for your first month.
        </Text>

        {/* Timeline */}
        <View className="mb-8">
          <View className="flex-row">
            {/* Timeline Line */}
            <View
              className="w-1 bg-orange-200 mr-4"
              style={{ marginLeft: 8 }}
            />

            {/* Timeline Items */}
            <View className="flex-1">
              {/* Today */}
              <View className="flex-row items-center mb-6">
                <View className="w-4 h-4 bg-orange-500 rounded-full -ml-6" />
                <Text className="text-base font-semibold text-gray-900 ml-4">
                  Today
                </Text>
              </View>

              {/* In 10 Days */}
              <View className="flex-row items-center mb-6">
                <View className="w-4 h-4 bg-orange-500 rounded-full -ml-6" />
                <Text className="text-base font-semibold text-gray-900 ml-4">
                  In 10 Days - Reminder
                </Text>
              </View>

              {/* In 30 Days */}
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-blue-500 rounded-full -ml-6" />
                <Text className="text-base font-semibold text-gray-900 ml-4">
                  In 30 Days - Trial Over
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Subscription Options */}
        <View className="flex-row gap-4 mb-4">
          {/* Monthly Option */}
          <TouchableOpacity
            onPress={() => setSelectedPlan("monthly")}
            className={`flex-1 rounded-xl border-2 p-4 ${
              selectedPlan === "monthly"
                ? "border-gray-900 bg-gray-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-gray-900">
                Monthly
              </Text>
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  selectedPlan === "monthly"
                    ? "border-gray-900 bg-gray-900"
                    : "border-gray-300 bg-white"
                }`}
              >
                {selectedPlan === "monthly" && (
                  <View className="w-2 h-2 rounded-full bg-white" />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Yearly Option */}
          <TouchableOpacity
            onPress={() => setSelectedPlan("yearly")}
            className={`flex-1 rounded-xl border-2 p-4 ${
              selectedPlan === "yearly"
                ? "border-gray-900 bg-gray-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-gray-900">
                Yearly
              </Text>
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  selectedPlan === "yearly"
                    ? "border-gray-900 bg-gray-900"
                    : "border-gray-300 bg-white"
                }`}
              >
                {selectedPlan === "yearly" && (
                  <View className="w-2 h-2 rounded-full bg-white" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* No Payment Text */}
        <Text className="text-center text-gray-600 mb-8">
          No payment needed now
        </Text>

        {/* Try Free Button */}
        <View className="mb-4">
          <Button
            text="Try 1 Month Free"
            className="bg-black"
            textColor="text-white"
            onPress={() => {
              // Navigate to main app after subscription
              router.push("/(tabs)");
            }}
          />
        </View>

        {/* Price Text */}
        <Text className="text-center text-gray-500 text-sm mb-8">
          Just £1.99 a month
        </Text>
      </ScrollView>
    </View>
  );
}
