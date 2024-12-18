import { Event } from "@/app/(tabs)/(home)/index";
import { CandidateDetailsInfo } from "@/components/screens/home/event/candidate-details-info";
import { EventActions } from "@/components/screens/home/event/event-actions";
import { EventDetailsInfo } from "@/components/screens/home/event/event-details-info";
import { EventOptionsInfo } from "@/components/screens/home/event/event-options-info";
import { EventResultsInfo } from "@/components/screens/home/event/event-results-info";
import { ExamLocationInfo } from "@/components/screens/home/event/exam-location-info";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingContainer } from "@/components/ui/loading";
import { ScreenContainer } from "@/components/ui/screen-container";
import { axios } from "@/lib/axios";
import { Feather } from "@expo/vector-icons";
import { isAfter } from "date-fns";
import { openURL } from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";
import { useQuery } from "react-query";
import colors from "tailwindcss/colors";

const fetchEventByIdQuery = (eventId: string): Promise<Event> =>
  axios.get(`/event/${eventId}`).then(({ data }) => data.event);

export default function EventDetailsScreen() {
  const { id: eventId } = useLocalSearchParams();

  const {
    data: event,
    refetch: fetchEvent,
    isLoading,
  } = useQuery(["event", eventId], ({ queryKey }) =>
    fetchEventByIdQuery(queryKey[1] as string)
  );

  const handleEventSubscribe = () => {
    openURL(
      `https://vestibular.coperve.ufsc.br/inscricao/evento/${eventId}/dados`
    );
  };

  if (isLoading) {
    return (
      <ScreenContainer canGoBack>
        <LoadingContainer />
      </ScreenContainer>
    );
  }

  if (!event) {
    return (
      <ScreenContainer canGoBack>
        <Text>Evento não encontrado!</Text>
      </ScreenContainer>
    );
  }

  const lastExamDate = event.examList.at(-1)?.examEndDate;
  const isFinishedTest = lastExamDate
    ? isAfter(new Date(), lastExamDate)
    : false;

  return (
    <ScreenContainer
      canGoBack
      isLoading={isLoading}
      onRefresh={fetchEvent}
      className="space-y-4"
    >
      <Card className="flex-row space-x-2">
        <View className="flex-[3] space-y-2">
          <Text className="font-bold">{event.eventName}</Text>
          {!event.candidate ? (
            <View className="items-start space-y-2">
              <Badge text="Incrição não realizada" badgeType="danger" />
              {isAfter(new Date(), event.registrationEndDate) ? (
                <Badge
                  text="Período de inscrição encerrado"
                  badgeType="danger"
                />
              ) : (
                <Badge text="Inscrições abertas" badgeType="info" />
              )}
            </View>
          ) : (
            <View className="items-start space-y-2">
              {event.candidate.registrationPaid ? (
                <Badge text="Incrição efetivada" badgeType="success" />
              ) : (
                <Badge
                  text="Incrição não efetivada por falta de pagamento"
                  badgeType="danger"
                />
              )}
            </View>
          )}
        </View>
        <Image
          className="flex-1 rounded-md aspect-square"
          source={{ uri: event.image }}
        />
      </Card>

      {event.candidate && (
        <View className="space-y-4">
          <CandidateDetailsInfo candidate={event.candidate} />
          {event.result &&
          (event.result.classified || event.result?.waitList?.length > 0) ? (
            <EventResultsInfo result={event.result} />
          ) : (
            event.examLocation && (
              <ExamLocationInfo examLocation={event.examLocation} />
            )
          )}
          <EventOptionsInfo
            optionList={event.options}
            isFinishedTest={isFinishedTest}
          />
        </View>
      )}

      {!event.examLocation && <EventDetailsInfo event={event} />}

      {event.candidate ? (
        <EventActions isFinishedTest={isFinishedTest} />
      ) : (
        <Button
          title="Inscrição"
          titleAlign="center"
          icon={<Feather name="edit" color={colors.white} size={18} />}
          onPress={handleEventSubscribe}
        />
      )}
    </ScreenContainer>
  );
}
