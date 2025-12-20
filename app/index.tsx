import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center p-5 bg-white">
      <Text className="text-xl font-bold mb-5 text-gray-900">
        Home Sreen
      </Text>
      <TouchableOpacity
        className="mt-5 px-4 py-3 bg-blue-500 rounded-lg"
        onPress={() => router.push('/choose-plan')}>
        <Text className="text-white text-base font-semibold">
          Go to Second Screen
        </Text>
      </TouchableOpacity>
    </View>
  );
}

