import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "@/utils/types";

// Color mapping for topics (same as other pages)
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

// Display format for modal header
const formatDateDisplay = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface PostModalProps {
  visible: boolean;
  date: Date | null;
  post: Post | null;
  onClose: () => void;
}

export default function PostModal({
  visible,
  date,
  post,
  onClose,
}: PostModalProps) {
  const formattedDate = date ? formatDateDisplay(date) : "";

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 bg-black/50 justify-center items-center"
      >
        {/* Modal Card */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-[90%] w-full max-h-[80%] shadow-xl"
        >
          <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
            {/* Header with close button */}
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-1">
                  {formattedDate}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                className="p-1"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            {post ? (
              // Show post content
              <>
                <Text className="text-2xl font-bold text-gray-900 mb-4">
                  {post.title}
                </Text>

                {/* Topics and Lessons */}
                <View className="gap-4">
                  {post.topics.map((topic, idx) => (
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
              </>
            ) : (
              // Show empty state
              <View className="items-center py-8">
                <Ionicons name="document-outline" size={48} color="#9CA3AF" />
                <Text className="text-gray-500 text-lg font-semibold mt-4">
                  No lessons recorded
                </Text>
                <Text className="text-gray-400 text-sm mt-2 text-center">
                  You haven't added any lessons for {formattedDate}
                </Text>
              </View>
            )}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
