import { ScreenContainer } from "@/components/ui/screen-container";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotificationScreen() {
  return (
    <ScreenContainer title="Notificações">
      <View className="gap-y-4">
        <View className="p-4 bg-white rounded-md shadow-md">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-x-1">
              <Text className="font-bold">Notificação 1</Text>
              <Text className="text-lg font-extrabold text-red-600">•</Text>
            </View>
            <TouchableOpacity>
              <Feather name="x" size={18} />
            </TouchableOpacity>
          </View>
          <Text>Você foi convocado para cursar História.</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
