import { Event } from "@/app/(tabs)/(home)/index";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
      <Card className="items-start space-y-2" {...rest}>
        {/* <Text className="text-base font-semibold text-blue-500 uppercase">
          4898341 - BRUNO BARRETO
        </Text> */}
        <Text className="font-semibold">{event.eventName}</Text>
        <View className="flex-row items-center gap-x-1 ">
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
        <View>
          {event.examList.map((exam, index) => (
            <Text key={index} className="font-semibold">
              {exam.description} - {formatFullDate(exam.examStartDate)}
            </Text>
          ))}
        </View>
        <Badge
          text="Incrição não efetivada por falta de pagamento"
          badgeType="danger"
        />
        <Badge text="Período de inscrição encerrado" badgeType="danger" />
      </Card>
    </LinkButton>
  );
}
