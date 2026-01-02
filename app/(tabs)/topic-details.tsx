import { View, Text, ScrollView, TouchableOpacity } from "react-native"; //Native Components
import { SafeAreaView } from "react-native-safe-area-context"; //SafeArea for the area that can be used on the screen
import { useRouter, useLocalSearchParams } from "expo-router"; //useRouter for navigation, use...Params so we can used the params from the last page
import { Ionicons } from "@expo/vector-icons"; //Use Icons on our page
import { useState, useCallback } from "react"; //state management & memoization
import { useFocusEffect } from "expo-router"; //re render only when screen is focused on
import { getPosts } from "@/utils/storage"; //helper function to get the posts
import { Post } from "@/utils/types"; //Type defintion for Posts

//Color mapping for topics (same as other pages)
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

export default function TopicDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  //Topic Name from the params
  const topicName = params.topicName as string; //TypeScript - type assertion
  //By default - TS assumes its loosely typed so w/o as string it assumes it can be an array of strings, string or undefined
  //Pros of defining as string - you can manipulate it as a string with TS complaining

  //State for grouped lessons
  const [groupedLessons, setGroupedLessons] = useState<
    {
      date: string;
      postTitle: string;
      lessons: string[];
    }[]
  >([]);

  //Load Lessons for this topic to groupedLessons
  /*
  useCallback needed so no re renders doesnt make new function & needed if we use useFocusEffect
  useCallback - dependency array - [topicName] - if topicName changes then we can reload it
  lessonData - TS definition for our data

  Notes
  .forEach returns undefined so cant define to a variable
  Define the correct type interface for each varaible not just Object[] - Poor TS programming
  .push is better than spread operator as push adds in place, but spread operator creates new array each iteration
   */
  const loadTopicLessons = useCallback(async () => {
    try {
      const posts: Post[] = await getPosts();
      const lessonData: {
        date: string;
        postTitle: string;
        lessons: string[];
      }[] = [];

      //Filter and extract lessons for this topic
      posts.forEach((post) => {
        post.topics.forEach((topic) => {
          if (topic.topicName === params.topicName) {
            lessonData.push({
              date: post.date,
              postTitle: post.title,
              lessons: topic.lessons,
            });
          }
        });
      });

      //Lessons in random order so lets sort
      lessonData.sort((a, b) => {
        const dateA = a.date.split("/").reverse().join("-");
        const dateB = b.date.split("/").reverse().join("-");
        return dateB.localeCompare(dateA);
      });

      //setting the state variable
      setGroupedLessons(lessonData);
    } catch (error) {
      console.log(`Error with loadTopicLessons function`, error);
    }
  }, [topicName]);

  // Load when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadTopicLessons();
    }, [loadTopicLessons])
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-6 bg-white border-b border-gray-200">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/topics")}
              className="p-2 -ml-2"
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-600 ml-2">
              Topic Details
            </Text>
          </View>

          {/* Topic Badge */}
          <View
            className={`${getTopicColor(topicName)} px-4 py-2 rounded-full self-start mb-2`}
          >
            <Text className="text-white text-base font-semibold">
              {topicName}
            </Text>
          </View>

          <Text className="text-sm text-gray-500">
            {groupedLessons.reduce(
              (sum, group) => sum + group.lessons.length,
              0
            )}{" "}
            total lessons
          </Text>
        </View>

        {/* Grouped Lessons by Date */}
        <View className="px-5 py-6">
          {groupedLessons.length > 0 ? (
            <View className="gap-4">
              {groupedLessons.map((group, groupIndex) => (
                <View
                  key={groupIndex}
                  className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
                >
                  {/* Date Header */}
                  <View className="mb-3">
                    <Text className="text-xs text-gray-500 mb-1">
                      {group.date}
                    </Text>
                    <Text className="text-lg font-semibold text-gray-900">
                      {group.postTitle}
                    </Text>
                  </View>

                  {/* Lessons List */}
                  <View className="gap-2">
                    {group.lessons.map((lesson, lessonIndex) => (
                      <View key={lessonIndex} className="flex-row">
                        <Text className="text-gray-900 mr-2">•</Text>
                        <Text className="flex-1 text-base text-gray-700 leading-6">
                          {lesson}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-xl p-8 items-center">
              <Text className="text-gray-500 text-base mb-2">
                No lessons found
              </Text>
              <Text className="text-gray-400 text-sm text-center">
                No lessons recorded for this topic yet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
