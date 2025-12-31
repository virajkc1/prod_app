import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert, //Pop up message show to user
  ActivityIndicator, //Loading spinner
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
//useLocalSearchParams is a hook that allows you to get the parameters passed from the previous screen
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  savePosts,
  hasPostToday,
  formatDate,
  updatePost,
} from "@/utils/storage"; //helper functions
import { Post, TopicBlock } from "@/utils/types"; //type for the post

//interface to validate the form entry
interface validateError {
  title?: string;
  topic?: string;
  lessons?: string;
}

//functional component to create a post
export default function CreatePostScreen() {
  const router = useRouter(); //useRouter is a webhook to navigate between screens
  const params = useLocalSearchParams(); //get parameters passed from previous screen

  // Check if we're in edit mode by checking if mode param exists
  const isEditMode = params.mode === "edit";
  const postId = params.postId as string; //get the post ID if editing
  const postDate = params.postDate as string; //get original date if editing

  const [title, setTitle] = useState<string>(
    isEditMode ? (params.postTitle as string) : ""
  ); //title of the post

  // Parse topics from params if editing - convert JSON string back to array
  const initialTopics: TopicBlock[] =
    isEditMode && params.postTopics
      ? JSON.parse(params.postTopics as string).map((topic: TopicBlock) => ({
          ...topic,
          id: topic.id || Date.now().toString(),
        }))
      : [];

  // Array of topic blocks - starts empty, user clicks "Add Topic" to add blocks
  const [topicBlocks, setTopicBlocks] = useState<TopicBlock[]>(initialTopics);
  // Option A: Empty array

  const [errors, setErrors] = useState<validateError>({}); // errors of the form
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // loading state eg: loading spinner

  // ============ TOPIC BLOCK MANAGEMENT FUNCTIONS ============

  // Function 1: Add a new empty topic block
  const addTopicBlock = () => {
    const newBlock: TopicBlock = {
      id: Date.now().toString(), // Unique timestamp ID
      topicName: "", // Empty topic name
      lessons: [""], // Start with one empty lesson input field
    };
    setTopicBlocks((prev) => [...prev, newBlock]); // Add to array without mutation
  };

  // Function 2: Delete a topic block by id
  const deleteTopicBlock = (idToDelete: string) => {
    setTopicBlocks((prev) => prev.filter((block) => block.id !== idToDelete)); //.filter once found will remove the item so make the item shorter but .map will keep the item but change the item
  };

  // Function 3: Update a topic block's name
  const updateTopicName = (topicId: string, newName: string) => {
    setTopicBlocks((prev) =>
      prev.map((block) =>
        block.id === topicId ? { ...block, topicName: newName } : block
      )
    );
  };

  // Function 4: Add a new empty lesson to a specific topic block
  const addLessonToTopic = (topicId: string) => {
    setTopicBlocks((prev) =>
      prev.map((block) =>
        block.id === topicId
          ? { ...block, lessons: [...block.lessons, ""] }
          : block
      )
    );
  };

  // Function 5: Update a specific lesson within a topic block
  const updateTopicLesson = (
    topicId: string,
    lessonIndex: number,
    newValue: string
  ) => {
    setTopicBlocks((prev) =>
      prev.map((block) => {
        if (block.id === topicId) {
          const updatedLessons = [...block.lessons]; //rather than modifying the original
          //best to create a new array as it causes different REFERENCES so the change is detected by react and it RE RENDERS SO UI SHOWS THE CHANGE
          updatedLessons[lessonIndex] = newValue;
          return { ...block, lessons: updatedLessons };
        }
        return block;
      })
    );
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; topic?: string; lessons?: string } = {};

    // Validate title
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    // Validate topic blocks - at least one topic block required
    if (topicBlocks.length === 0) {
      newErrors.topic = "At least one topic is required";
      setErrors(newErrors);
      return false;
    }

    // Validate each topic block has a name and at least one non-empty lesson
    for (const block of topicBlocks) {
      if (!block.topicName.trim()) {
        newErrors.topic = "All topics must have a name";
        break;
      }

      const nonEmptyLessons = block.lessons.filter(
        (lesson) => lesson.trim().length > 0
      );
      if (nonEmptyLessons.length === 0) {
        newErrors.lessons = "Each topic must have at least one lesson";
        break; //needed to break out of the loop but not the entire function so that setErrors is called after the loop
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Only check daily limit if creating new post (not editing)
    if (!isEditMode) {
      const postExistsToday = await hasPostToday();
      if (postExistsToday) {
        Alert.alert(
          "Daily Limit Reached",
          "You can only create one post per day. Please come back tomorrow!",
          [
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ]
        );
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Filter out empty lessons
      const cleanedTopics = topicBlocks.map((block) => {
        const cleanedLessons = block.lessons.filter(
          (lesson) => lesson.trim().length > 0
        );
        return {
          ...block,
          lessons: cleanedLessons,
        };
      });

      if (isEditMode) {
        // ============ UPDATE EXISTING POST ============
        const updatedPost: Post = {
          id: postId, // Keep same ID
          title: title.trim(),
          topics: cleanedTopics,
          date: postDate, // Keep original date - this is the key requirement
        };

        const success = await updatePost(updatedPost);

        if (success) {
          Alert.alert("Success", "Post updated successfully!", [
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ]);
        } else {
          Alert.alert("Error", "Failed to update post. Please try again.");
        }
      } else {
        // ============ CREATE NEW POST ============
        // Generate post ID and date
        const postId = Date.now().toString();
        const postDate = formatDate(new Date());

        // Create Post object
        const newPost: Post = {
          id: postId,
          title: title.trim(),
          topics: cleanedTopics,
          date: postDate,
        };

        // Save post
        await savePosts([newPost]);

        // Show success message
        Alert.alert("Success", "Post created successfully!", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error saving post:", error);
      Alert.alert("Error", "Failed to save post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4">
          <View className="flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute left-0 p-2"
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">
              {isEditMode ? "Edit Post" : "Create a Post"}
            </Text>
          </View>
        </View>

        {/* Form Card */}
        <View className="mx-5 mt-6 bg-white rounded-2xl p-5 shadow-sm">
          {/* Title Input */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Title
            </Text>
            <TextInput
              placeholder="Enter Here..."
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={(value) => {
                //as soon as we type, errors to be removed
                setTitle(value);
                if (errors.title !== undefined) {
                  setErrors((prev) => ({ ...prev, title: undefined })); //replace error.title to none this is better than an empty string
                }
              }}
              className={`bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 border ${
                errors.title ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <Text className="text-red-500 text-sm mt-1">{errors.title}</Text>
            )}
          </View>

          {/* ============ TOPIC BLOCKS SECTION ============ */}

          {/* Show "Add Topic" button if no topics exist */}
          {topicBlocks.length === 0 ? (
            <View className="mb-6 items-center py-8">
              <Text className="text-gray-500 mb-4">No topics yet</Text>
              <TouchableOpacity
                onPress={addTopicBlock}
                className="bg-blue-500 rounded-xl px-6 py-3"
              >
                <Text className="text-white font-semibold">Add Topic</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Render each topic block */}
              {topicBlocks.map((block, blockIndex) => (
                <View key={block.id} className="mb-6">
                  {/* Topic Header with Delete Button */}
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-base font-semibold text-gray-900">
                      Topic {blockIndex + 1}
                    </Text>
                    <TouchableOpacity
                      onPress={() => deleteTopicBlock(block.id)}
                      className="p-2"
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Topic Name Input */}
                  <TextInput
                    placeholder="Enter topic name..."
                    placeholderTextColor="#9CA3AF"
                    value={block.topicName}
                    onChangeText={(value) => updateTopicName(block.id, value)}
                    className="bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 border border-gray-200 mb-4"
                  />

                  {/* Lessons for this Topic */}
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    Lessons Learnt
                  </Text>
                  {block.lessons.map((lesson, lessonIndex) => (
                    <View
                      key={lessonIndex}
                      className="flex-row items-center mb-3"
                    >
                      <View className="mr-3">
                        <Text className="text-gray-900 text-lg">◆</Text>
                      </View>
                      <TextInput
                        placeholder="Enter lesson..."
                        placeholderTextColor="#9CA3AF"
                        value={lesson}
                        onChangeText={(value) =>
                          updateTopicLesson(block.id, lessonIndex, value)
                        }
                        className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 border border-gray-200"
                      />
                    </View>
                  ))}

                  {/* Add More Lessons Button */}
                  <TouchableOpacity
                    onPress={() => addLessonToTopic(block.id)}
                    className="mt-2"
                  >
                    <Text className="text-blue-600 text-sm font-medium">
                      Add more lessons...
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}

              {/* Add Another Topic Button */}
              <TouchableOpacity
                onPress={addTopicBlock}
                className="bg-blue-100 rounded-xl px-6 py-3 items-center mb-4"
              >
                <Text className="text-blue-600 font-semibold">
                  + Add Another Topic
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* Submit Button */}
        <View className="mx-5 mt-4 mb-8">
          <TouchableOpacity
            className={`rounded-xl py-4 px-6 items-center shadow-md ${
              isSubmitting ? "bg-orange-300" : "bg-orange-200"
            }`}
            activeOpacity={0.8}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#111827" />
            ) : (
              <Text className="text-gray-900 text-lg font-bold">
                {isEditMode ? "Update" : "Submit"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
