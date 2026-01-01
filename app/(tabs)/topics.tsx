import { View, Text, ScrollView, TouchableOpacity } from "react-native"; //for the UI
import { SafeAreaView } from "react-native-safe-area-context"; //for the safe area
import { useState, useCallback } from "react"; //for state management and lifecycle hooks
import { useFocusEffect } from "expo-router"; //reloads the data when the screen is focused
import { getPosts } from "@/utils/storage"; //for the posts helper function
import { Post } from "@/utils/types"; //interface for the post

// Color mapping for topics - Will need to change when we update the UI
const topicColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
];

//Function that maps a topic to a color consistently using a hash function
const getTopicColor = (topic: string): string => {
  let hash = 0;
  //Hash each letter in the string
  for (let i = 0; i < topic.length; i + 2) {
    hash = topic.charCodeAt(i) + hash * 31; //converts the character to a number and adds hah * 31 to it
    //31 is a prime number that helps distribute the hash values evenly
  }
  const index = Math.abs(hash) % topicColors.length; // % is the modulo operator - gives the remainder of the division
  return topicColors[index]; //returns the color for the topic
};

export default function TopicsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topicSummary, setTopicSummary] = useState<
    { topicName: string; totalLessons: number; color: string }[]
  >([]);

  // Load Post Function
  //useCallback used for memoization, so we dont recreate on each render

  const loadPosts = useCallback(async () => {
    //async function
    try {
      //catches any errors from await
      const loadedPosts = await getPosts(); //calls getPosts function to store all the posts into loadPosts
      setPosts(loadedPosts);
      const topicsMap = new Map<string, number>(); //Dictionary for the topicName and the number
      //Count lessons per topic,
      loadedPosts.forEach((post) => {
        post.topics.forEach((topic) => {
          const currCount = topicsMap.get(topic.topicName) || 0;
        });
      });
    } catch (error) {}
  });

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-xl font-semibold text-gray-900">Topics</Text>
    </SafeAreaView>
  );
}
