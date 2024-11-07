import { NotificationItem } from "@/components/screens/notification/notification-item";
import { LoadingContainer } from "@/components/ui/loading";
import { ScreenContainer } from "@/components/ui/screen-container";
import { useAuth } from "@/contexts/auth/auth-context";
import { axios } from "@/lib/axios";
import { Text, View } from "react-native";
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

  const {
    data: notifications,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["notification"],
    queryFn: () => fetchUserNotificationsQuery(cpf),
  });

  if (isLoading) {
    return (
      <ScreenContainer title="Notificações">
        <LoadingContainer />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer title="Notificações" onRefresh={refetch}>
      {cpf ? (
        <View className="space-y-4">
          {notifications && notifications?.length > 0 ? (
            notifications?.map((notification, index) => (
              <NotificationItem key={index} notification={notification} />
            ))
          ) : (
            <Text>Não há notificações no momento</Text>
          )}
        </View>
      ) : (
        <Text>Efetue o login para visualizar suas notificações</Text>
      )}
    </ScreenContainer>
  );
}
