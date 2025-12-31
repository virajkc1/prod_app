import { useRouter } from "expo-router";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Linking, //used to get the url of the terms and conditions and privacy policy
} from "react-native";
import SquaredPaperBackground from "@/components/SquaredPaperBackground";
import { useState } from "react";
import Button from "@/components/onboarding/Button";
import { AntDesign } from "@expo/vector-icons";

//This is the home screen of the app
export default function Index() {
  const router = useRouter();
  //boolean state for visibility
  const [modal, setModal] = useState<boolean>(false);

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
            className="mt-20 w-80 py-3 bg-black rounded-xl"
            onPress={() => router.push("/create-account")}
          >
            <Text className="text-white text-xl text-center font-bold">
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-4 w-80 py-2  rounded-xl border-[1px] border-gray-300 "
            //cant put JSX inside onPress
            onPress={() => setModal(true)}
          >
            <Text className="text-black text-xl text-center font-bold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Modal View for the user needs */}
      <View></View>
      <Modal
        visible={modal}
        animationType="slide" // or "fade"
        transparent={true} //so you can still see the background
        onRequestClose={() => setModal(false)} //modal closes if the User uses the ios swipe feature to escape
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            {/* Header first */}
            <View className="flex-row justify-between items-center mb-6">
              <View className="w-8" />

              <Text className="text-3xl font-semibold">Sign In</Text>
              <TouchableOpacity onPress={() => setModal(false)}>
                <Text className="text-2xl text-gray-500">×</Text>
              </TouchableOpacity>
            </View>

            <View className="py-5 px-6 border-t border-gray-300">
              <Button
                text="Sign in with Apple"
                icon={<AntDesign name="apple" size={20} color="white" />}
                onPress={() => {}}
                className="bg-black mb-10"
                textColor="text-white"
              />
              <Button
                icon={
                  <Image
                    source={require("@/assets/images/google-icon.png")}
                    style={{ width: 20, height: 20 }}
                  />
                }
                text="Sign in with Google"
                onPress={() => {}}
                className="bg-gray-200 mb-10"
                textColor="text-black"
              />
              <Text className="text-sm text-center text-gray-600">
                By continuing you agree to Capto's
              </Text>
              <Text className="text-sm text-center text-gray-600">
                <Text
                  className="underline"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                    )
                  }
                >
                  Terms and Conditions
                </Text>{" "}
                and{" "}
                <Text
                  className="underline"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                    )
                  }
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SquaredPaperBackground>
  );
}
