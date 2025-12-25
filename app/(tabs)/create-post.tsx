import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function CreatePostScreen() {
  const router = useRouter();
  const [lessons, setLessons] = useState<string[]>([""]);

  const addLesson = () => {
    setLessons([...lessons, ""]);
  };

  const updateLesson = (index: number, value: string) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = value;
    setLessons(updatedLessons);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4">
          <Text className="text-sm text-gray-600 mb-2">Create Post Page</Text>
          
          <View className="flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute left-0 p-2"
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">Create a Post</Text>
          </View>
        </View>

        {/* Form Card */}
        <View className="mx-5 mt-6 bg-white rounded-2xl p-5 shadow-sm">
          {/* Title Input */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-900 mb-2">Title</Text>
            <TextInput
              placeholder="Enter Here..."
              placeholderTextColor="#9CA3AF"
              className="bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 border border-gray-200"
            />
          </View>

          {/* Topic Input */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-900 mb-2">Topic</Text>
            <TextInput
              placeholder="Enter Here"
              placeholderTextColor="#9CA3AF"
              className="bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 border border-gray-200"
            />
          </View>

          {/* Lessons Learnt Section */}
          <View className="mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Lessons Learnt
            </Text>
            {lessons.map((lesson, index) => (
              <View key={index} className="flex-row items-center mb-3">
                <View className="mr-3">
                  <Text className="text-gray-900 text-lg">◆</Text>
                </View>
                <TextInput
                  placeholder="Enter lesson..."
                  placeholderTextColor="#9CA3AF"
                  value={lesson}
                  onChangeText={(value) => updateLesson(index, value)}
                  className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 border border-gray-200"
                />
              </View>
            ))}
            <TouchableOpacity onPress={addLesson} className="mt-2">
              <Text className="text-blue-600 text-sm font-medium">Add more...</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* New Topic Button */}
        <View className="mx-5 mt-6">
          <TouchableOpacity
            className="bg-orange-200 rounded-xl py-3 px-6 items-center"
            activeOpacity={0.8}
          >
            <Text className="text-gray-900 text-base font-semibold">New Topic</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <View className="mx-5 mt-4 mb-8">
          <TouchableOpacity
            className="bg-orange-200 rounded-xl py-4 px-6 items-center shadow-md"
            activeOpacity={0.8}
          >
            <Text className="text-gray-900 text-lg font-bold">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
