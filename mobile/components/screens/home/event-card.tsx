import { Event } from "@/app/(tabs)/(home)/index";
import { Badge } from "@/components/ui/badge";
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
    <LinkButton href={`/event/${event.id}`}>
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
          <Badge
            text="Incrição não efetivada por falta de pagamento"
            type="danger"
          />
          <Badge text="Período de inscrição encerrado" type="danger" />
        </View>
      </View>
    </LinkButton>
  );
}
