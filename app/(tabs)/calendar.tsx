import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { getPosts } from "@/utils/storage";
import { Post } from "@/utils/types";
import Calendar from "@/components/Calendar";

// Color mapping for topics
const topicColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
];

const getTopicColor = (topic: string): string => {
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = topic.charCodeAt(i) + hash * 31;
  }
  const index = Math.abs(hash) % topicColors.length;
  return topicColors[index];
};

// Convert Date to DD/MM/YYYY string (matches post storage format)
const formatDateToString = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Display format for selected date
const formatDateDisplay = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function CalendarScreen() {
  const router = useRouter();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load posts when screen is focused
  const loadPosts = useCallback(async () => {
    try {
      const loadedPosts = await getPosts();
      setPosts(loadedPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [loadPosts])
  );

  // Check if viewing current month
  const isCurrentMonth = () => {
    return (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  // Navigate to next month (only if not current month)
  const goToNextMonth = () => {
    if (!isCurrentMonth()) {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
      );
    }
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Get post for selected date
  const selectedPost = selectedDate
    ? posts.find((p) => p.date === formatDateToString(selectedDate))
    : null;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View className="px-5 pt-4 pb-2">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2"
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-600 ml-2">
              Learning Calendar
            </Text>
          </View>
        </View>

        {/* Month Navigation Header */}
        <View className="flex-row items-center justify-between px-5 py-4">
          <TouchableOpacity onPress={goToPreviousMonth} className="p-2">
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-gray-900">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>

          <TouchableOpacity
            onPress={goToNextMonth}
            disabled={isCurrentMonth()}
            className="p-2"
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isCurrentMonth() ? "#D1D5DB" : "#111827"}
            />
          </TouchableOpacity>
        </View>

        {/* Calendar Component */}
        <Calendar
          posts={posts}
          currentMonth={currentMonth}
          onDateSelect={handleDateSelect}
        />

        {/* Selected Date Details */}
        {selectedDate && (
          <View className="px-5 py-6">
            <View className="bg-white rounded-xl p-5 shadow-sm">
              {/* Date Header */}
              <Text className="text-sm text-gray-500 mb-2">
                {formatDateDisplay(selectedDate)}
              </Text>

              {/* Post Content */}
              {selectedPost ? (
                <>
                  {/* Post Title */}
                  <Text className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedPost.title}
                  </Text>

                  {/* Topics and Lessons */}
                  <ScrollView
                    className="max-h-96"
                    showsVerticalScrollIndicator={true}
                  >
                    <View className="gap-4">
                      {selectedPost.topics.map((topic, idx) => (
                        <View key={idx} className="gap-2">
                          {/* Topic Badge */}
                          <View
                            className={`${getTopicColor(
                              topic.topicName
                            )} px-3 py-1 rounded-full self-start`}
                          >
                            <Text className="text-white text-sm font-semibold">
                              {topic.topicName}
                            </Text>
                          </View>

                          {/* Lessons */}
                          {topic.lessons.length > 0 ? (
                            <View className="gap-2">
                              {topic.lessons.map((lesson, lessonIdx) => (
                                <View key={lessonIdx} className="flex-row">
                                  <Text className="text-gray-900 mr-2">•</Text>
                                  <Text className="flex-1 text-base text-gray-700 leading-6">
                                    {lesson}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          ) : (
                            <Text className="text-gray-400 italic text-sm">
                              No lessons recorded
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </>
              ) : (
                // Empty state for dates without posts
                <View className="items-center py-8">
                  <Ionicons name="document-outline" size={48} color="#9CA3AF" />
                  <Text className="text-gray-500 text-lg font-semibold mt-4">
                    No lessons recorded
                  </Text>
                  <Text className="text-gray-400 text-sm mt-2 text-center">
                    You haven't added any lessons for this date
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Helper Text - Only show when no date selected */}
        {!selectedDate && (
          <View className="px-5 py-6">
            <View className="bg-white rounded-xl p-4">
              <View className="flex-row items-start gap-3 mb-3">
                <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
                  <Text className="text-white font-semibold">1</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-gray-700">
                    Days with lessons recorded
                  </Text>
                </View>
              </View>
              <View className="flex-row items-start gap-3 mb-3">
                <View className="w-8 h-8 rounded-full border-2 border-blue-500 items-center justify-center">
                  <Text className="text-gray-900 font-semibold">1</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-gray-700">
                    Today (you can add lessons)
                  </Text>
                </View>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="w-8 h-8 items-center justify-center">
                  <Text className="text-gray-300 font-semibold">1</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-gray-700">
                    Future dates (not yet available)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

