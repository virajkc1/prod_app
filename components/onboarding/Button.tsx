import { TouchableOpacity } from "react-native";
import { StyleProp, ViewStyle } from "react-native";
import { Text } from "react-native";
interface ButtonProps {
  text?: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  text,
  onPress,
  disabled,
  className,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`p-4 border-radius-md rounded-xl  w-full items-center justify-center ${!disabled ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"} ${className}`}
    >
      <Text
        className={`text-lg font-semibold ${!disabled ? "text-white" : "text-[#9CA3AF]"}`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
