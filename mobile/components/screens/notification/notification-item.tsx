import { Notification } from "@/app/(tabs)/notification";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";

interface NotificationItemProps extends ViewProps {
  notification: Notification;
}

export function NotificationItem(props: NotificationItemProps) {
  const {
    notification: { title, message },
    ...rest
  } = props;

  return (
    <View className="p-4 bg-white rounded-md shadow-md" {...rest}>
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-x-1">
          <Text className="text-2xl font-extrabold text-red-600">•</Text>
          <Text className="font-bold">{title}</Text>
        </View>
        <TouchableOpacity>
          <Feather name="x" size={18} />
        </TouchableOpacity>
      </View>
      <Text>{message}</Text>
    </View>
  );
}
