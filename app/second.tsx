import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Second() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center p-5 bg-gray-100">
      <Text className="text-2xl font-bold mb-5 text-gray-900">
        Second Screen
      </Text>
      <TouchableOpacity
        className="mt-5 px-4 py-3 bg-green-500 rounded-lg"
        onPress={() => router.back()}>
        <Text className="text-white text-base font-semibold">
          Go Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

