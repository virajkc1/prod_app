import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getPosts, deletePost } from "@/utils/storage";
import { Post } from "@/utils/types";
import { useRouter } from "expo-router";

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
  const router = useRouter(); //useRouter is a hook that allows you to navigate to a new screen

  const userName = "Dan";
  const streakDays = 5;
  const [posts, setPosts] = useState<Post[]>([]); //State to store the posts
  const [topics, setTopics] = useState<{ name: string; color: string }[]>([]); //State to store the topics
  const [latestPost, setLatestPost] = useState<Post | null>(null); //State to store the latest post
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest"); //State to store sort order (newest to oldest or oldest to newest)

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

  // Sort posts based on sortOrder state
  const getSortedPosts = () => {
    const sortedPosts = [...posts]; // Create a copy to avoid mutating state
    sortedPosts.sort((a, b) => {
      // Convert date strings (DD/MM/YYYY) to comparable format
      const dateA = a.date.split("/").reverse().join("-"); // YYYY-MM-DD
      const dateB = b.date.split("/").reverse().join("-"); // YYYY-MM-DD

      if (sortOrder === "newest") {
        return dateB.localeCompare(dateA); // Newest first (descending)
      } else {
        return dateA.localeCompare(dateB); // Oldest first (ascending)
      }
    });
    return sortedPosts;
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

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

  //Delete Post Function
  const handleDeletePost = (postId: string, postTitle: string) => {
    //Show confirmation to delete the post
    Alert.alert(
      "Delete Post",
      `Are you sure you want to delete "${postTitle}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const success = await deletePost(postId);
            if (success) {
              // Reload posts to update the UI
              await loadPosts();
            } else {
              Alert.alert("Error", "Failed to delete post. Please try again.");
            }
          },
        },
      ]
    );
  };
  //params are the data thats passed to the next screen when editing a post
  const handleEditPost = (post: Post) => {
    //Navigate to the create a post page
    //params are the data thats passed to the next screen
    router.push({
      pathname: "/(tabs)/create-post",
      params: {
        mode: "edit",
        postId: post.id,
        postTitle: post.title,
        postDate: post.date,
        postTopics: JSON.stringify(post.topics),
      },
    });
  };

  const handleViewPost = (post: Post) => {
    //Navigate to the post detail page
    //params are the data thats passed to the next screen
    router.push({
      pathname: "/(tabs)/post-detail",
      params: {
        postId: post.id,
        postTitle: post.title,
        postDate: post.date,
        postTopics: JSON.stringify(post.topics),
      },
    });
  };

  // Map posts to lesson card format (using sorted posts)
  const lessons = getSortedPosts().map((post) => ({
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

          {/* Calendar Button */}
          <TouchableOpacity
            className="flex-1 bg-blue-500 rounded-xl p-4 items-center justify-center"
            activeOpacity={0.7}
            onPress={() => router.push("/(tabs)/calendar")}
          >
            <Ionicons name="calendar-outline" size={32} color="white" />
            <Text className="text-white text-base font-semibold mt-2">
              View Calendar
            </Text>
            <Text className="text-white text-xs mt-1 opacity-80">
              Track your daily learnings
            </Text>
          </TouchableOpacity>
        </View>

        {/* All Lessons Section */}
        <View className="px-5 mt-8 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">All Lessons</Text>
            <TouchableOpacity
              onPress={toggleSortOrder}
              className="flex-row items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
              activeOpacity={0.7}
            >
              <Text className="text-sm text-gray-700 font-medium">
                {sortOrder === "newest" ? "Newest" : "Oldest"}
              </Text>
              <Ionicons
                name={sortOrder === "newest" ? "arrow-down" : "arrow-up"}
                size={16}
                color="#374151"
              />
            </TouchableOpacity>
          </View>

          {/* Lesson Cards */}
          {lessons.length > 0 ? (
            <View className="gap-4">
              {lessons.map((lesson) => {
                const fullPost = posts.find((p) => p.id === lesson.id);

                return (
                  <View
                    key={lesson.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        if (fullPost) {
                          router.push({
                            pathname: "/(tabs)/post-detail",
                            params: {
                              postId: fullPost.id,
                              postDate: fullPost.date,
                              postTitle: fullPost.title,
                              postTopics: JSON.stringify(fullPost.topics),
                            },
                          });
                        }
                      }}
                    >
                      <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-lg font-semibold text-gray-900">
                          {lesson.title}
                        </Text>
                        <Text className="text-xs text-gray-600">
                          {lesson.date}
                        </Text>
                      </View>

                      {lesson.content.length > 0 && (
                        <View className="mb-3 gap-1">
                          {/* .slice is exclusive */}
                          {lesson.content.slice(0, 3).map((item, idx) => (
                            <Text
                              key={idx}
                              numberOfLines={1} // So each item is only 1 line
                              ellipsizeMode="tail" //ends with a ... if its too long
                              className="text-sm text-gray-700"
                            >
                              • {item}
                            </Text>
                          ))}
                          {lesson.content.length > 3 && (
                            <Text className="text-xs text-gray-400 mt-1">
                              +{lesson.content.length - 3} more lessons...
                            </Text>
                          )}
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
                    </TouchableOpacity>

                    {/* Bottom Row - Edit and Delete Icons */}
                    <View className="flex-row items-center justify-between ">
                      {/* Edit Icon */}
                      <TouchableOpacity
                        onPress={() =>
                          handleEditPost({
                            id: lesson.id,
                            title: lesson.title,
                            date: lesson.date,
                            topics:
                              posts.find((p) => p.id === lesson.id)?.topics ||
                              [],
                          })
                        }
                        className="p-2 rounded-full items-start"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Ionicons
                          name="create-outline"
                          size={20}
                          color="#3b82f6"
                        />
                      </TouchableOpacity>
                      {/* Delete Icon */}
                      <TouchableOpacity
                        onPress={() =>
                          handleDeletePost(lesson.id, lesson.title)
                        }
                        className="p-2 px-4 rounded-full active:bg-red-50"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color="#ef4444"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
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
