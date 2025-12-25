import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";
import SquaredPaperBackground from "@/components/SquaredPaperBackground";

//This is the home screen of the app
export default function Index() {
  const router = useRouter();

  return (
    <SquaredPaperBackground
      gridSize={20}
      lineColor="#E5E7EB"
      backgroundColor="#FFFFFF"
    >
      <View className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text className="text-4xl font-bold mt-4 text-gray-900">CAPTO</Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("@/assets/images/capto_mascot.png")}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
        </View>
        <View className="flex- items-center justify-center p-5">
          {" "}
          <Text className="text-3xl text-center text-gray-900 font-bold mb-2">
            Remember what you did every day
          </Text>
        </View>
        <View className="flex-1 mb-20 items-center justify-center p-5">
          <Text className="text-gray-500 text-center text-base font-medium px-10 mt-2">
            Keep track of your daily activities and develop new habits with
            CAPTO
          </Text>
          <TouchableOpacity
            className="mt-20 w-80 py-2 bg-black rounded-xl"
            onPress={() => router.push("/create-account")}
          >
            <Text className="text-white text-xl text-center font-bold">
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-4 w-80 py-2  rounded-xl border-[1px] border-gray-300 "
            onPress={() => router.push("../(tabs)/index")}
          >
            <Text className="text-black text-xl text-center font-bold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SquaredPaperBackground>
  );
}
