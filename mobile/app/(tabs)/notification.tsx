import { ScreenContainer } from "@/components/ui/screen-container";
import { useAuth } from "@/contexts/auth/auth-context";
import { axios } from "@/lib/axios";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";

interface Notification {
  userId: string;
  title: string;
  message: string;
}

const fetchUserNotificationsQuery = (cpf?: string): Promise<Notification[]> =>
  axios.get(`/notification/${cpf}`).then(({ data }) => data.notifications);

export default function NotificationScreen() {
  const { cpf } = useAuth();

  const { data: notifications } = useQuery("notification", () =>
    fetchUserNotificationsQuery(cpf)
  );

  return (
    <ScreenContainer title="Notificações">
      <View className="gap-y-4">
        {notifications?.map(({ title, message }, index) => (
          <View key={index} className="p-4 bg-white rounded-md shadow-md">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-x-1">
                <Text className="font-bold">{title}</Text>
                <Text className="text-lg font-extrabold text-red-600">•</Text>
              </View>
              <TouchableOpacity>
                <Feather name="x" size={18} />
              </TouchableOpacity>
            </View>
            <Text>{message}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}
