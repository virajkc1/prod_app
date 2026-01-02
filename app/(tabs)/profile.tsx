import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // For icons
import { router } from "expo-router"; // For navigation

export default function ProfileScreen() {
  const [mobilePush, setMobilePush] = useState(false);
  const [emailPush, setEmailPush] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const SectionHeader = ({ title }: { title: string }) => (
    <Text className="text-base font-semibold text-gray-900 mb-3">{title}</Text>
  );

  const SettingsRow = ({
    label,
    subtitle,
    rightElement,
  }: {
    label: string;
    subtitle?: string;
    rightElement: React.ReactNode;
  }) => (
    <View className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center">
      <View className="flex-1">
        <Text className="text-sm font-medium text-gray-900">{label}</Text>
        {subtitle && (
          <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>
        )}
      </View>
      {rightElement}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-200 bg-white">
        <Text className="text-xl font-bold text-center">Settings</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="mb-4 font-semibold text-xl">Technical Support</Text>
        {/* Add social media links here */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center"
          onPress={() => {
            /* open social media */
          }}
        >
          <View>
            {" "}
            <Text className="text-sm font-medium text-gray-900">
              Contact Us
            </Text>
            <Text className="text-xs pt-1 text-gray-500">
              Contact us for any technical issue or feedback
            </Text>
          </View>
          <View className="bg-gray-100 rounded-md px-4 py-2">
            <Text className="text-sm font-medium">Contact</Text>
          </View>
        </TouchableOpacity>

        {/* Notifications Section */}
        <Text className="mb-4 font-semibold text-xl">Notifications</Text>
        {/* Add your notification toggles here */}
        <SettingsRow
          label="Mobile push notifications"
          subtitle="Receive notifications daily for new or old topics"
          rightElement={
            <Switch
              value={mobilePush}
              onValueChange={setMobilePush}
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={mobilePush ? "#3b82f6" : "#f4f4f5"}
            />
          }
        />
        <SettingsRow
          label="Email push notifications"
          subtitle="Receive notifications daily for new or old topics"
          rightElement={
            <Switch
              value={mobilePush}
              onValueChange={setMobilePush}
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={mobilePush ? "#3b82f6" : "#f4f4f5"}
            />
          }
        />
        {/* Appearance Section */}
        <View className="mt-6">
          <Text className="mb-4 font-semibold text-xl">Appearance</Text>
          {/* Add your appearance toggle here */}
        </View>
        <SettingsRow
          label="Display Appearance"
          subtitle="Choose light mode or dark mode "
          rightElement={
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={isDarkMode ? "#3b82f6" : "#f4f4f5"}
            />
          }
        />
        {/* Account Section */}
        <View className="mt-6">
          <Text className="mb-4 font-semibold text-xl">Account</Text>
          {/* Add username, logout, delete account here */}
          <TouchableOpacity
            className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center"
            onPress={() => {
              /* handle logout */
            }}
          >
            <View>
              <Text className="text-sm font-medium text-gray-900">
                Change Username
              </Text>
              <Text className="text-xs text-gray-500">
                Change your name on this device
              </Text>
            </View>
            <View className="bg-gray-100 rounded-md px-4 py-2">
              <Text className="text-sm font-medium text-center ">Change </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center"
            onPress={() => {
              /* handle logout */
            }}
          >
            <View>
              <Text className="text-sm font-medium text-gray-900 ">
                Log out
              </Text>
              <Text className="text-xs text-gray-500">
                Log out of your account here
              </Text>
            </View>
            <View className="bg-gray-100 rounded-md px-4 py-2">
              <Text className="text-sm font-medium">Logout</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center"
            onPress={() => {
              /* handle logout */
            }}
          >
            <View>
              <Text className="text-sm font-medium text-gray-900">
                Delete Account
              </Text>
              <Text className="text-xs text-gray-500">
                Delete your account here
              </Text>
            </View>
            <View className="bg-transparent border-red-500 border-[1px] rounded-md px-4 py-2">
              <Text className="text-sm text-red-500 font-medium">Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Support & Legal Section */}
        <View className="mt-6">
          <Text className="mb-4 font-semibold text-xl">Legal</Text>
          {/* Add terms and privacy policy links here */}
          <TouchableOpacity
            className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center"
            onPress={() => {
              /* open social media */
            }}
          >
            <Text className="text-sm font-medium text-gray-900">
              Terms & Conditions
            </Text>
            <View className="bg-transparent border border-gray-300 rounded-md px-4 py-2">
              <Text className="text-sm  font-medium">View</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center"
            onPress={() => {
              /* open social media */
            }}
          >
            <Text className="text-sm font-medium text-gray-900">
              Privacy Policy
            </Text>
            <View className="bg-transparent border border-gray-300 rounded-md px-4 py-2">
              <Text className="text-sm  font-medium">View</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Follow Us Section */}
        <View className="mt-6">
          <Text className="mb-4 font-semibold text-xl">Follow Us</Text>
          {/* Add social media links here */}
          <TouchableOpacity
            className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center"
            onPress={() => {
              /* open social media */
            }}
          >
            <Text className="text-sm font-medium text-gray-900">Instagram</Text>
            <View className="bg-gray-100 rounded-md px-4 py-2">
              <Text className="text-sm font-medium">Open</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center"
            onPress={() => {
              /* open social media */
            }}
          >
            <Text className="text-sm font-medium text-gray-900">TikTok</Text>
            <View className="bg-gray-100 rounded-md px-4 py-2">
              <Text className="text-sm font-medium">Open</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded-lg p-4 mb-2 flex-row justify-between items-center"
            onPress={() => {
              /* open social media */
            }}
          >
            <Text className="text-sm font-medium text-gray-900">X</Text>
            <View className="bg-gray-100 rounded-md px-4 py-2">
              <Text className="text-sm font-medium">Open</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
