import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/onboarding/Button";

export default function GiveRatingScreen() {
  const router = useRouter();

  const reviews = [
    {
      id: 1,
      name: "Viraj Chapaneri",
      rating: 5,
      text: "Hello testing testing this will be a review soon when i decide to create more reviews and develop this page",
    },
    {
      id: 2,
      name: "Viraj Chapaneri",
      rating: 5,
      text: "Hello testing testing this will be a review soon when i decide to create more reviews and develop this page",
    },
  ];

  const renderStars = (count: number) => {
    return (
      <View className="flex-row">
        {[...Array(count)].map((_, i) => (
          <Text key={i} className="text-yellow-500 text-lg">
            ★
          </Text>
        ))}
      </View>
    );
  };

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
              style={{ width: "82%" }}
            />
          </View>
        </View>
        {/* Title */}
        <Text className="text-3xl font-bold text-[#111827] mb-6">
          Give us a rating
        </Text>

        {/* Rating Display Section */}
        <View className="mb-6">
          <View className="flex-row items-center mb-4">
            {/* Trophy Icon */}
            <View className="w-16 h-16 bg-white rounded-full items-center justify-center mr-4">
              <Text className="text-3xl">🏆</Text>
            </View>

            {/* Rating Info */}
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-1">
                5 Stars
              </Text>
              {renderStars(5)}
              <Text className="text-sm text-gray-500 mt-1">
                1K+ App Ratings
              </Text>
            </View>
          </View>

          {/* Separator Line */}
          <View className="h-px bg-gray-300" />
        </View>

        {/* Feedback Prompt */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
            We need you to help us improve
          </Text>
          <Text className="text-base text-gray-600 text-center">
            Please give us honest feedback on the app & any improvements we can
            make
          </Text>
        </View>

        {/* Review Input Fields */}
        <View className="mb-8">
          {reviews.map((review) => (
            <View
              key={review.id}
              className="bg-white rounded-xl p-4 mb-4 border border-gray-200"
            >
              <View className="flex-row items-start mb-3">
                {/* Profile Picture Placeholder */}
                <View className="w-12 h-12 bg-gray-300 rounded-full mr-3" />

                {/* Name and Stars */}
                <View className="flex-1">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-base font-semibold text-gray-900">
                      {review.name}
                    </Text>
                    {renderStars(review.rating)}
                  </View>

                  {/* Review Text */}
                  <Text className="text-sm text-gray-600 leading-5">
                    {review.text}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Finish Button */}
        <View className="mb-4">
          <Button
            text="Finish"
            onPress={() => {
              // Navigate to next screen or complete onboarding
              router.push("/free-trial");
            }}
          />
        </View>

        {/* Not Now Link */}
        <TouchableOpacity
          onPress={() => {
            // Skip rating
            router.push("/free-trial");
          }}
          className="items-center py-4"
        >
          <Text className="text-gray-600 text-base">Not Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
