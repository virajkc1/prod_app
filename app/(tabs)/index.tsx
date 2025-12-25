import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomePage() {
  const userName = "Dan";
  const streakDays = 5;

  // Calendar dates (Wed 10 to Fri 19)
  const calendarDates = [
    { day: "Wed", date: 10 },
    { day: "Thu", date: 11 },
    { day: "Fri", date: 12 },
    { day: "Sat", date: 13 },
    { day: "Sun", date: 14 },
    { day: "Mon", date: 15 },
    { day: "Tue", date: 16 },
    { day: "Wed", date: 17 },
    { day: "Thu", date: 18 },
    { day: "Fri", date: 19 },
  ];

  const topics = [
    { name: "React JS", color: "bg-red-500" },
    { name: "Node JS", color: "bg-orange-500" },
    { name: "Express JS", color: "bg-green-500" },
  ];

  const lessons = [
    {
      id: 1,
      date: "02/11/2025",
      title: "Leetcode & Fun",
      tags: ["React", "Node"],
      tagColors: ["bg-red-500", "bg-blue-500"],
      content: [
        "Solved a Leetcode problem",
        "Utilized useState",
        "Utilized useTransition",
      ],
    },
    {
      id: 2,
      date: "01/11/2025",
      title: "Leetcode & Fun",
      tags: ["Express JS", "Node JS"],
      tagColors: ["bg-orange-500", "bg-blue-500"],
      content: [],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4">
          <Text className="text-lg font-semibold text-gray-900">Blog Page</Text>
        </View>

        {/* Greeting Section */}
        <View className="px-5 pt-6 items-center">
          <Text className="text-3xl font-bold text-gray-900">
            Hi, {userName}!
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-xl">👍</Text>
            <Text className="text-lg font-semibold text-gray-700 ml-2">
              {streakDays} Day Streak
            </Text>
          </View>
        </View>

        {/* Calendar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-6 px-5"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {calendarDates.map((item, index) => (
            <View
              key={index}
              className="items-center justify-center mr-4 min-w-[50px]"
            >
              <Text className="text-xs text-gray-600">{item.day}</Text>
              <Text className="text-base font-semibold text-gray-900 mt-1">
                {item.date}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Topics and Latest Learnings Row */}
        <View className="flex-row px-5 mt-6 gap-4">
          {/* Topics Section */}
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Topics
            </Text>
            <View className="gap-2">
              {topics.map((topic, index) => (
                <View
                  key={index}
                  className={`${topic.color} px-4 py-2 rounded-full`}
                >
                  <Text className="text-white text-sm font-medium text-center">
                    {topic.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Latest Learnings Card */}
          <View className="flex-1 bg-gray-50 rounded-xl p-4">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Latest Learnings
            </Text>
            <Text className="text-xs text-gray-600 mb-3">02/11/2025</Text>
            <View className="gap-1">
              <Text className="text-xs text-gray-700">
                • Solved a Leetcode problem
              </Text>
              <Text className="text-xs text-gray-700">• Utilized useState</Text>
              <Text className="text-xs text-gray-700">
                • Utilized useTransition
              </Text>
            </View>
          </View>
        </View>

        {/* All Lessons Section */}
        <View className="px-5 mt-8 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">All Lessons</Text>
            <TouchableOpacity>
              <Ionicons name="menu" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Lesson Cards */}
          <View className="gap-4">
            {lessons.map((lesson) => (
              <View
                key={lesson.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-lg font-semibold text-gray-900">
                    {lesson.title}
                  </Text>
                  <Text className="text-xs text-gray-600">{lesson.date}</Text>
                </View>

                {lesson.content.length > 0 && (
                  <View className="mb-3 gap-1">
                    {lesson.content.map((item, idx) => (
                      <Text key={idx} className="text-sm text-gray-700">
                        • {item}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Tags */}
                <View className="flex-row gap-2 mb-3 flex-wrap">
                  {lesson.tags.map((tag, idx) => (
                    <View
                      key={idx}
                      className={`${lesson.tagColors[idx]} px-3 py-1 rounded-full`}
                    >
                      <Text className="text-white text-xs font-medium">
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Expand Button */}
                <TouchableOpacity className="self-start">
                  <Text className="text-blue-600 text-sm font-medium">
                    Expand
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
