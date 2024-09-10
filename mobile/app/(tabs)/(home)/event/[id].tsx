import { Event } from "@/app/(tabs)/(home)/index";
import { Badge } from "@/components/ui/badge";
import { ScreenContainer } from "@/components/ui/screen-container";
import { axios } from "@/lib/axios";
import { formatFullDate } from "@/utils/format-date";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import colors from "tailwindcss/colors";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event>();

  const fetchEvent = async () => {
    await axios
      .get(`/event/${id}`)
      .then(({ data }) => {
        setEvent(data.event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  return (
    <ScreenContainer title="Voltar" canGoBack>
      {event ? (
        <View className="gap-y-4">
          <View className="flex-row p-4 bg-white rounded-md shadow-md">
            <View className="items-start flex-1 gap-y-2">
              <Text className="font-bold">{event.eventName}</Text>
              <Badge text="Incrição não realizada" type="danger" />
              <Badge text="Período de inscrição encerrado" type="danger" />
            </View>
          </View>

          <View className="p-4 bg-white rounded-md shadow-md">
            <View>
              <Text className="mb-1 font-bold">Inscrições</Text>
              <Text>
                <Text className="font-bold">Início: </Text>
                {formatFullDate(event.registrationStartDate)}
              </Text>
              <Text>
                <Text className="font-bold">Fim: </Text>
                {formatFullDate(event.registrationEndDate)}
              </Text>
            </View>

            <View className="mt-4">
              <Text className="mb-1 font-bold">Provas</Text>
              {event.examList?.map((exam, index) => (
                <Text key={index}>
                  <Text className="font-bold">{exam.description} - </Text>
                  {formatFullDate(exam.examStartDate)}
                </Text>
              ))}
            </View>

            <View className="mt-4">
              <Text className="mb-1 font-bold">Valor da inscrição</Text>
              <Text>
                {event.registrationCost > 0 ? (
                  <>
                    <Text className="font-bold">R$: </Text>
                    {event.registrationCost}
                  </>
                ) : (
                  "Grátis"
                )}
              </Text>
            </View>

            <View className="mt-4">
              <Text className="mb-1 font-bold">Modalidades</Text>
              <Text>{event.modalities}</Text>
            </View>

            <View className="mt-4">
              <Text className="mb-1 font-bold">Cursos</Text>
              <Text>{event.coursesAmount} cursos</Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="items-center justify-center w-full h-full">
          <ActivityIndicator color={colors.black} size={30} />
        </View>
      )}
    </ScreenContainer>
  );
}
