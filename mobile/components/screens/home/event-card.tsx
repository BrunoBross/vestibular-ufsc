import { Event } from "@/app/(tabs)/(home)/index";
import { LinkButton } from "@/components/ui/link-button";
import { formatFullDate } from "@/utils/format-date";
import { Feather } from "@expo/vector-icons";
import { Text, View, ViewProps } from "react-native";
import colors from "tailwindcss/colors";

interface EventCardProps extends ViewProps {
  event: Event;
}

export function EventCard(props: EventCardProps) {
  const { event, ...rest } = props;

  return (
    <LinkButton href="/event/1">
      <View className="flex-row p-4 bg-white rounded-md shadow-md" {...rest}>
        <View className="items-start w-full gap-y-1">
          {/* <Text className="text-base font-semibold text-blue-100 uppercase">
            4898341 - BRUNO BARRETO
          </Text> */}
          <Text className="font-semibold">{event.eventName}</Text>
          <View className="flex-row items-center gap-x-1">
            <Feather name="calendar" color={colors.zinc[500]} size={16} />
            <Text className="font-medium text-zinc-500">Inscrições</Text>
          </View>
          <Text className="font-semibold">
            De {formatFullDate(event.registrationStartDate)} a{" "}
            {formatFullDate(event.registrationEndDate)}
          </Text>
          <View className="flex-row items-center gap-x-1">
            <Feather name="book-open" color={colors.zinc[500]} size={16} />
            <Text className="font-medium text-zinc-500">Prova(s)</Text>
          </View>
          {event.examList.map((exam, index) => (
            <Text key={index} className="font-semibold">
              {exam.description} - {formatFullDate(exam.examStartDate)}
            </Text>
          ))}
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
    </LinkButton>
  );
}
