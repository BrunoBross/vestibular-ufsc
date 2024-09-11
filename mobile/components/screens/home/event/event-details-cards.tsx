import { Event } from "@/app/(tabs)/(home)";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatFullDate } from "@/utils/format-date";
import { Feather } from "@expo/vector-icons";
import { openURL } from "expo-linking";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";
import { EventActions } from "./event-actions";
import { EventInfoBox } from "./event-info-box";
import { EventInfoText } from "./event-info-text";

interface EventDetailsCardsProps {
  event: Event;
}

export function EventDetailsCards(props: EventDetailsCardsProps) {
  const { event } = props;

  const handleEventSubscribe = () => {
    openURL(
      `https://vestibular.coperve.ufsc.br/inscricao/evento/${event.id}/dados`
    );
  };

  return (
    <View className="space-y-4">
      <Card className="items-start space-y-2">
        <Text className="font-bold">{event.eventName}</Text>
        <Badge text="Incrição não realizada" type="danger" />
        <Badge text="Período de inscrição encerrado" type="danger" />
      </Card>

      <EventActions />

      <Card className="space-y-4">
        <EventInfoBox title="Inscrições">
          <EventInfoText prefix="Início:">
            {formatFullDate(event.registrationStartDate)}
          </EventInfoText>
          <EventInfoText prefix="Fim:">
            {formatFullDate(event.registrationEndDate)}
          </EventInfoText>
        </EventInfoBox>

        <EventInfoBox title="Provas">
          {event.examList?.map((exam, index) => (
            <EventInfoText prefix={`${exam.description} -`} key={index}>
              {formatFullDate(exam.examStartDate)}
            </EventInfoText>
          ))}
        </EventInfoBox>

        <EventInfoBox title="Valor da inscrição">
          {event.registrationCost > 0 ? (
            <EventInfoText prefix="R$:">{event.registrationCost}</EventInfoText>
          ) : (
            <EventInfoText>Grátis</EventInfoText>
          )}
        </EventInfoBox>

        <EventInfoBox title="Modalidades">
          <EventInfoText>{event.modalities}</EventInfoText>
        </EventInfoBox>

        <EventInfoBox title="Cursos">
          <EventInfoText>{event.coursesAmount} cursos</EventInfoText>
        </EventInfoBox>
      </Card>

      <Button
        title="Inscrição"
        titleAlign="center"
        icon={<Feather name="edit" color={colors.white} size={18} />}
        onPress={handleEventSubscribe}
      />
    </View>
  );
}
