import { View, Text, ScrollView, TouchableOpacity } from "react-native"; //for the UI
import { SafeAreaView } from "react-native-safe-area-context"; //for the safe area
import { useState, useCallback } from "react"; //for state management and lifecycle hooks
import { useFocusEffect, useRouter } from "expo-router"; //reloads the data when the screen is focused
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
  for (let i = 0; i < topic.length; i++) {
    hash = topic.charCodeAt(i) + hash * 31; //converts the character to a number and adds hah * 31 to it
    //31 is a prime number that helps distribute the hash values evenly
  }
  const index = Math.abs(hash) % topicColors.length; // % is the modulo operator - gives the remainder of the division
  return topicColors[index]; //returns the color for the topic
};

export default function TopicsScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [topicSummary, setTopicSummary] = useState<
    { topicName: string; totalLessons: number; color: string }[]
  >([]);

  // Load Post Function
  //useCallback used for memoization, so we dont recreate on each render

  const loadPosts = useCallback(async () => {
    //Debugging log

    //async function
    try {
      //catches any errors from await
      const loadedPosts = await getPosts(); //calls getPosts function to store all the posts into loadPosts
      setPosts(loadedPosts);
      const topicsMap = new Map<string, number>(); //Dictionary for the topicName and the number
      //Count lessons per topic,
      loadedPosts.forEach((post) => {
        post.topics.forEach((topic) => {
          const currCount = topicsMap.get(topic.topicName) || 0; //tries getting the value from that topic else it doesnt exist so its 0
          topicsMap.set(topic.topicName, currCount + topic.lessons.length); //sets the value to the topic name and the current count + number of lessons
        });
      });
      //Converting a Map into an array of UI objects - good practice

      /*
      Each of the key value pairs from the hash map , are mapped over
      Array then stores an object for each entry with a topicName:topicName, totalLessons:totalLessons and a color which is taken from the 
      getTopicColor function - passing the topicName as is hash function will calculate it
      */

      //.entries - returns an iterator over the key value pairs in the map
      const topicsArray = Array.from(topicsMap.entries()).map(
        ([topicName, totalLessons]) => ({
          //array destructuring
          topicName,
          totalLessons,
          color: getTopicColor(topicName),
        })
      );
      //Sort alphabetically by topicName
      topicsArray.sort((a, b) => a.topicName.localeCompare(b.topicName)); //inplace sorting
      setTopicSummary(topicsArray);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }, []);

  //Load the posts when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [loadPosts])
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-6 pb-4">
          <Text className="text-3xl font-bold text-gray-900">Topics</Text>
          <Text className="text-sm text-gray-500 mt-1">
            {topicSummary.length}{" "}
            {topicSummary.length === 1 ? "topic" : "topics"}
          </Text>
        </View>

        {/* Topics Grid */}
        <View className="px-5 pb-6">
          {topicSummary.length > 0 ? (
            <View className="gap-3">
              {topicSummary.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
                  activeOpacity={0.7}
                  onPress={() => {
                    router.push({
                      pathname: "/(tabs)/topic-details",
                      params: {
                        topicName: topic.topicName,
                      },
                    });
                  }}
                >
                  <View className="flex-row items-center justify-between">
                    {/* Topic Name with Color Badge */}
                    <View className="flex-1">
                      <View
                        className={`${topic.color} px-4 py-2 rounded-full self-start mb-2`}
                      >
                        <Text className="text-white text-sm font-semibold">
                          {topic.topicName}
                        </Text>
                      </View>
                      <Text className="text-gray-600 text-sm">
                        {topic.totalLessons}{" "}
                        {topic.totalLessons === 1 ? "lesson" : "lessons"}
                      </Text>
                    </View>

                    {/* Arrow Icon */}
                    <Text className="text-gray-400 text-2xl">›</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-xl p-8 items-center">
              <Text className="text-gray-500 text-base mb-2">
                No topics yet
              </Text>
              <Text className="text-gray-400 text-sm text-center">
                Create your first post to see topics here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
