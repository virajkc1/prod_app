import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/onboarding/Button";
import { useState } from "react";

export default function GiveRatingScreen() {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState(0);

  const renderStars = () => {
    return (
      <View className="flex-row gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setSelectedRating(star)}>
            <Text
              className={`text-5xl ${star <= selectedRating ? "text-orange-400" : "text-gray-300"}`}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
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
              style={{ width: "82%" }}
            />
          </View>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-2">
          Give us a rating
        </Text>
        <Text className="text-lg font-light text-[#111827] ">
          Please be our first <Text className="font-bold">100 users</Text> to
          rate us!
        </Text>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Icon */}
        <View className="items-center mb-36">
          {/* <Image
            source={require("@/assets/images/capto_mascot.png ")}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          /> */}
        </View>

        {/* Title */}
        <Text className="text-xl font-semibold text-gray-900 text-center">
          Hey Buddy,
        </Text>
        <Text className="text-xl font-semibold text-gray-900 text-center mb-6">
          Enjoying Capto so far?
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-gray-600 text-center mb-8">
          Please rate your experience with us
        </Text>

        {/* Stars */}
        <View className="items-center mb-12">{renderStars()}</View>

        {/* Bottom Text */}
        <Text className="text-base font-semibold text-gray-900 text-center mb-2"></Text>
        <Text className="text-sm text-gray-600 text-center mb-4"></Text>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Extra spacing */}
        <View className="h-32" />

        {/* Continue Button */}
        <View className="mb-4">
          <Button
            text="Continue"
            className="bg-blue-500"
            textColor="text-white"
            onPress={() => {
              router.push("/free-trial");
            }}
          />
        </View>

        {/* Not Now Link */}
        <TouchableOpacity
          onPress={() => {
            router.push("/free-trial");
          }}
          className="items-center py-2"
        >
          <Text className="text-gray-600 text-base">Not Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
