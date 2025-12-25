import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
//This is the home screen of the app
export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center p-5 bg-white">
      <Text className="text-xl font-bold mb-5 text-gray-900">Home Screen</Text>
      <TouchableOpacity
        className="mt-5 px-4 py-3 bg-blue-500 rounded-lg"
        onPress={() => router.push("/choose-plan")}
      >
        <Text className="text-white text-base font-semibold">
          Go to Choose Plan Screen
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="mt-5 px-4 py-3 bg-blue-500 rounded-lg"
        onPress={() => router.push("../(tabs)/index")}
      >
        <Text className="text-white text-base font-semibold">
          Dev to Content
        </Text>
      </TouchableOpacity>
    </View>
  );
}
