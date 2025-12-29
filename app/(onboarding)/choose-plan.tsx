import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/onboarding/Button";

type PlanType = "relaxed" | "balanced" | "intense" | null;

export default function ChoosePlanScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);

  const plans = [
    {
      id: "relaxed" as PlanType,
      title: "Relaxed",
      description: "A few notifications weekly to keep you on track",
    },
    {
      id: "balanced" as PlanType,
      title: "Balanced",
      description: "Regular check-ins to maintain consistency",
    },
    {
      id: "intense" as PlanType,
      title: "Intense",
      description: "Daily reminders and progress tracking",
    },
  ];

  const handleContinue = () => {
    if (selectedPlan) {
      router.push("/create-account");
    }
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
              style={{ width: "0%" }}
            />
          </View>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-2">
          Choose your Plan
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-[#6B7280] mb-10">
          Select the intensity that works best for your lifestyle
        </Text>

        {/* Plan Options */}
        <View className="mb-10">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.8}
                className={`rounded-xl border-2 mb-4 p-5 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-bold text-[#111827] flex-1">
                    {plan.title}
                  </Text>

                  {/* Radio Button */}
                  <View
                    className={`w-6 h-6 rounded-full border-2 justify-center items-center ${
                      isSelected
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <View className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </View>
                </View>

                <Text className="text-sm text-[#6B7280] leading-5 mt-1">
                  {plan.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <View className="mb-10">
          <Button
            text="Continue"
            onPress={handleContinue}
            disabled={!selectedPlan}
          />
        </View>
      </ScrollView>
    </View>
  );
}
