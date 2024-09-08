import { Feather } from "@expo/vector-icons";
import { Text, View, ViewProps } from "react-native";
import colors from "tailwindcss/colors";

interface EventCardProps extends ViewProps {}

export function EventCard(props: EventCardProps) {
  const { ...rest } = props;

  return (
    <View className="flex-row p-4 bg-white rounded-md shadow-md" {...rest}>
      <View className="items-start w-full gap-y-1">
        <Text className="text-base font-semibold text-blue-100 uppercase">
          4898341 - BRUNO BARRETO
        </Text>
        <Text className="font-semibold">
          Vestibular Unificado UFSC/IFSC 2024-2
        </Text>
        <View className="flex-row items-center gap-x-1">
          <Feather name="calendar" color={colors.zinc[500]} size={16} />
          <Text className="font-medium text-zinc-500">Inscrições</Text>
        </View>
        <Text className="font-semibold">
          De 18/04/2024 10:00 a 14/05/2024 23:59
        </Text>
        <View className="flex-row items-center gap-x-1">
          <Feather name="book-open" color={colors.zinc[500]} size={16} />
          <Text className="font-medium text-zinc-500">Prova(s)</Text>
        </View>
        <Text className="font-semibold">Prova - 23/06/2024 14:00</Text>
        <View className="px-2 py-1 bg-red-100 rounded-md">
          <Text className="text-xs text-red-200">
            Incrição não efetivada por falta de pagamento
          </Text>
        </View>
        <View className="px-2 py-1 bg-red-100 rounded-md">
          <Text className="text-xs text-red-200">
            Período de inscrição encerrado
          </Text>
        </View>
      </View>
    </View>
  );
}
