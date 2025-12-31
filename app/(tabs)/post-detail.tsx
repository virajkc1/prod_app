import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TopicBlock } from "@/utils/types";

// Color mapping for topics - Colors for topics (same as home page)
const topicColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
];

// Map topic to color consistently
const getTopicColor = (topic: string): string => {
  // Simple hash function for consistent color mapping
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = topic.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % topicColors.length;
  return topicColors[index];
};

export default function PostDetail() {
  //Navigate back to the previous screen
  const router = useRouter();
  //Get the parameters passed from the previous screen
  const params = useLocalSearchParams();

  //Post Data
  const postId = params.postId as string;
  const postDate = params.postDate as string;
  const postTitle = params.postTitle as string;

  //Post Topics
  const currentTopics: TopicBlock[] = params.postTopics
    ? JSON.parse(params.postTopics as string)
    : [];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-6 bg-white border-b border-gray-200">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2"
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-600 ml-2">
              Post Details
            </Text>
          </View>

          {/* Title and Date */}
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {postTitle || "Untitled Post"}
          </Text>
          <Text className="text-sm text-gray-500">{postDate}</Text>
        </View>

        {/* Content - Map through all topics */}
        <View className="px-5 py-6">
          {currentTopics.length > 0 ? (
            <View className="gap-6">
              {currentTopics.map((topic, topicIndex) => (
                <View
                  key={topic.id || topicIndex}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
                >
                  {/* Topic Badge */}
                  <View className="mb-4">
                    <View
                      className={`${getTopicColor(topic.topicName)} px-4 py-2 rounded-full self-start`}
                    >
                      <Text className="text-white text-sm font-semibold">
                        {topic.topicName}
                      </Text>
                    </View>
                  </View>

                  {/* Lessons List */}
                  <Text className="text-base font-semibold text-gray-900 mb-3">
                    Lessons Learned
                  </Text>
                  {topic.lessons && topic.lessons.length > 0 ? (
                    <View className="gap-2">
                      {topic.lessons.map((lesson, lessonIndex) => (
                        <View key={lessonIndex} className="flex-row">
                          <Text className="text-gray-900 mr-2">•</Text>
                          <Text className="flex-1 text-base text-gray-700 leading-6">
                            {lesson}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text className="text-gray-400 italic">
                      No lessons recorded
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-xl p-8 items-center">
              <Text className="text-gray-500">No topics found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
