import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Storage cleared!");
      // Or just clear posts:
      // await AsyncStorage.removeItem("@capto_posts");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-xl font-semibold text-gray-900">Search</Text>
      <Button title="Clear Storage" onPress={clearStorage} />
    </SafeAreaView>
  );
}
