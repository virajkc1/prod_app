import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getPosts } from "@/app/utils/storage";
import { Post } from "@/app/utils/types";

// Color mapping for topics -Colors for topics
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

export default function WelcomePage() {
  const userName = "Dan";
  const streakDays = 5;
  const [posts, setPosts] = useState<Post[]>([]); //State to store the posts
  const [topics, setTopics] = useState<{ name: string; color: string }[]>([]); //State to store the topics
  const [latestPost, setLatestPost] = useState<Post | null>(null); //State to store the latest post

  // Load posts function - defined with useCallback to maintain reference
  const loadPosts = useCallback(async () => {
    try {
      const loadedPosts = await getPosts();
      // State updates - React batches these together, so only 1 re-render occurs, not 3
      setPosts(loadedPosts); // State update #1

      // Extract unique topics
      const allTopics = loadedPosts
        .flatMap((post) => post.topics)
        .map((topic) => topic.topicName); //map gets all the topics from each post then flattens them meaning that instead of array of arrays all elemenets become 1
      const uniqueTopics = Array.from(new Set(allTopics)); //can be changed with chaining, code review
      const topicsWithColors = uniqueTopics.map((topic) => ({
        name: topic,
        color: getTopicColor(topic),
      }));
      setTopics(topicsWithColors); // State update #2

      // Set latest post (first one since sorted newest first)
      if (loadedPosts.length > 0) {
        setLatestPost(loadedPosts[0]); // State update #3
      } else {
        setLatestPost(null); // State update #3
      }
      // All 3 state updates above are batched by React → causes 1 re-render total
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }, []); // Empty deps - function doesn't depend on props/state

  // Load posts when screen is focused
  // useFocusEffect runs the callback when screen comes into focus (user navigates back)
  // The actual re-render is triggered by setPosts/setTopics/setLatestPost above
  useFocusEffect(
    //when returning to the screen, the useFocusEffect hook will run the loadPosts function as it calls its callback function
    useCallback(() => {
      loadPosts(); // callback function calls loadPosts, which updates state, which triggers re-render
    }, [loadPosts])
  );

  // Calendar dates (Wed 10 to Fri 19) - TODO: Make this dynamic based on current date
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

  // Map posts to lesson card format
  const lessons = posts.map((post) => ({
    id: post.id,
    date: post.date,
    title: post.title,
    tags: post.topics.map((topic) => topic.topicName),
    tagColors: post.topics.map((topic) => getTopicColor(topic.topicName)),
    content: post.topics.flatMap((topic) => topic.lessons),
  }));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Not Needed*/}

        {/* Greeting Section */}
        <View className="px-5 pt-6 mb-2 ml-2">
          <Text className="text-3xl font-bold text-gray-900">
            Hi, {userName}!
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-xl">🔥</Text>
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
              {topics.length > 0 ? (
                topics.map((topic, index) => (
                  <View
                    key={index}
                    className={`${topic.color} px-4 py-2 rounded-full`}
                  >
                    <Text className="text-white text-sm font-medium text-center">
                      {topic.name}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-xs text-gray-400">No topics yet</Text>
              )}
            </View>
          </View>

          {/* Latest Learnings Card */}
          <View className="flex-1 bg-gray-50 rounded-xl p-4">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Latest Learnings
            </Text>
            {latestPost ? (
              <>
                <Text className="text-xs text-gray-600 mb-3">
                  {latestPost.date}
                </Text>
                <View className="gap-1">
                  {latestPost.topics.flatMap((topic) => topic.lessons).length >
                  0 ? (
                    latestPost.topics
                      .flatMap((topic) => topic.lessons)
                      .map((lesson, idx) => (
                        <Text key={idx} className="text-xs text-gray-700">
                          • {lesson}
                        </Text>
                      ))
                  ) : (
                    <Text className="text-xs text-gray-500">
                      No lessons added
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <>
                <Text className="text-xs text-gray-400 mb-3">No posts yet</Text>
                <Text className="text-xs text-gray-400">
                  Create your first post to see it here
                </Text>
              </>
            )}
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
          {lessons.length > 0 ? (
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
          ) : (
            <View className="bg-white border border-gray-200 rounded-xl p-8 items-center">
              <Text className="text-gray-500 text-base mb-2">No posts yet</Text>
              <Text className="text-gray-400 text-sm text-center">
                Create your first post to start tracking your learnings!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
