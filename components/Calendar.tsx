import { View, Text, TouchableOpacity } from "react-native";
import { Post } from "@/utils/types";

// Convert Date to DD/MM/YYYY string (matches post storage format)
const formatDateToString = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

interface CalendarProps {
  posts: Post[];
  currentMonth: Date;
  onDateSelect: (date: Date) => void;
}

export default function Calendar({
  posts,
  currentMonth,
  onDateSelect,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate only actual days in month
  const calendarDays = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1)
  );

  // Add empty cells for alignment
  const emptyCells = Array.from({ length: firstDay }, () => null);
  const allCells = [...emptyCells, ...calendarDays];

  const getDateState = (date: Date) => {
    const dateStr = formatDateToString(date);
    const hasPost = posts.some((p) => p.date === dateStr);
    const isFuture = date > today;
    const isToday = date.getTime() === today.getTime();

    return { hasPost, isFuture, isToday };
  };

  return (
    <View className="bg-white rounded-xl p-4 mx-5">
      {/* Day headers */}
      <View className="flex-row mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <View key={day} className="flex-1 items-center">
            <Text className="text-xs text-gray-600 font-semibold">{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View className="flex-row flex-wrap">
        {allCells.map((date, index) => {
          // Empty cell for alignment
          if (!date) {
            return (
              <View
                key={`empty-${index}`}
                className="w-[14.28%] aspect-square items-center justify-center"
              />
            );
          }

          const { hasPost, isFuture, isToday } = getDateState(date);

          // Future date: gray, disabled
          if (isFuture) {
            return (
              <View
                key={index}
                className="w-[14.28%] aspect-square items-center justify-center"
              >
                <Text className="text-gray-300 text-base">
                  {date.getDate()}
                </Text>
              </View>
            );
          }

          // Past or today: clickable
          return (
            <View
              key={index}
              className="w-[14.28%] aspect-square items-center justify-center"
            >
              <TouchableOpacity
                className={`w-10 h-10 items-center justify-center rounded-full ${
                  hasPost ? "bg-blue-500" : ""
                } ${isToday && !hasPost ? "border-2 border-blue-500" : ""} ${
                  isToday && hasPost ? "border-2 border-blue-700" : ""
                }`}
                onPress={() => onDateSelect(date)}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-base ${
                    hasPost ? "text-white font-semibold" : "text-gray-900"
                  }`}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

