import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TopicsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-xl font-semibold text-gray-900">Topics</Text>
    </SafeAreaView>
  );
}
