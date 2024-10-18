import { NotificationItem } from "@/components/screens/notification/notification-item";
import { ScreenContainer } from "@/components/ui/screen-container";
import { useAuth } from "@/contexts/auth/auth-context";
import { axios } from "@/lib/axios";
import { View } from "react-native";
import { useQuery } from "react-query";

export interface Notification {
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
      <View className="space-y-4">
        {notifications?.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </View>
    </ScreenContainer>
  );
}
