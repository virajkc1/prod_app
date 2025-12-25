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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { savePosts, hasPostToday, formatDate } from "@/app/utils/storage"; //helper functions
import { Post } from "@/app/utils/types"; //type for the post

interface validateError {
  title?: string;
  topic?: string;
  lessons?: string;
}

export default function CreatePostScreen() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [lessons, setLessons] = useState<string[]>([""]);
  const [errors, setErrors] = useState<validateError>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const addLesson = () => {
    setLessons([...lessons, ""]);
  };

  const updateLesson = (index: number, value: string) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = value;
    setLessons(updatedLessons);
    // Clear lessons error when user starts typing
    if (errors.lessons) {
      setErrors({ ...errors, lessons: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; topic?: string; lessons?: string } = {};

    // Validate title
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    // Validate topic
    if (!topic.trim()) {
      newErrors.topic = "Topic is required";
    }

    // Validate lessons - at least one non-empty lesson
    const nonEmptyLessons = lessons.filter(
      (lesson) => lesson.trim().length > 0
    );
    if (nonEmptyLessons.length === 0) {
      newErrors.lessons = "At least one lesson is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check daily post limit
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

    setIsSubmitting(true);

    try {
      // Filter out empty lessons
      const filteredLessons = lessons.filter(
        (lesson) => lesson.trim().length > 0
      );

      // Generate post ID and date
      const postId = Date.now().toString();
      const postDate = formatDate(new Date());

      // Create Post object
      const newPost: Post = {
        id: postId,
        title: title.trim(),
        topic: topic.trim(),
        lessons: filteredLessons,
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
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4">
          <Text className="text-sm text-gray-600 mb-2">Create Post Page</Text>

          <View className="flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute left-0 p-2"
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">
              Create a Post
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

          {/* Topic Input */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Topic
            </Text>
            <TextInput
              placeholder="Enter Here"
              placeholderTextColor="#9CA3AF"
              value={topic}
              onChangeText={(value) => {
                setTopic(value);
                if (errors.topic) {
                  setErrors({ ...errors, topic: undefined });
                }
              }}
              className={`bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 border ${
                errors.topic ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.topic && (
              <Text className="text-red-500 text-sm mt-1">{errors.topic}</Text>
            )}
          </View>

          {/* Lessons Learnt Section */}
          <View className="mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Lessons Learnt
            </Text>
            {lessons.map((lesson, index) => (
              <View key={index} className="flex-row items-center mb-3">
                <View className="mr-3">
                  <Text className="text-gray-900 text-lg">◆</Text>
                </View>
                <TextInput
                  placeholder="Enter lesson..."
                  placeholderTextColor="#9CA3AF"
                  value={lesson}
                  onChangeText={(value) => updateLesson(index, value)}
                  className={`flex-1 bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 border ${
                    errors.lessons ? "border-red-500" : "border-gray-200"
                  }`}
                />
              </View>
            ))}
            <TouchableOpacity onPress={addLesson} className="mt-2">
              <Text className="text-blue-600 text-sm font-medium">
                Add more...
              </Text>
            </TouchableOpacity>
            {errors.lessons && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.lessons}
              </Text>
            )}
          </View>
          <View className="mx-5 mt-6">
            <TouchableOpacity
              className="bg-orange-200 rounded-xl py-3 px-6 items-center"
              activeOpacity={0.8}
            >
              <Text className="text-gray-900 text-base font-semibold">
                New Topic
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* New Topic Button */}

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
              <Text className="text-gray-900 text-lg font-bold">Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
