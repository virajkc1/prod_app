import { TouchableOpacity } from "react-native";
import { StyleProp, ViewStyle } from "react-native";
import { Text, View } from "react-native";
interface ButtonProps {
  text?: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  icon?: React.ReactNode; //this are things that react can render (display eg: JSX, string, array etc)
}

export default function Button({
  text,
  onPress,
  disabled,
  className,
  textColor,
  icon,
}: ButtonProps) {
  // Check if className contains a background color class
  const hasCustomBg = className?.includes("bg-");

  // Default background classes only if no custom background is provided
  const defaultBg = !hasCustomBg && !disabled ? "bg-blue-500" : "";
  const disabledBg = !hasCustomBg && disabled ? "bg-gray-200" : "";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`p-4 border-radius-md rounded-xl w-full items-center justify-center ${defaultBg} ${disabledBg} ${className || ""}`}
    >
      <View className="flex-row items-center justify-center gap-2">
        {icon}
        <Text className={`text-lg font-semibold ${textColor || "text-black"}`}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
