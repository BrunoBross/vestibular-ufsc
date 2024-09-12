import HeaderImage from "@/assets/images/app/header.png";
import { EventList } from "@/components/screens/home/event-list";
import { LoadingContainer } from "@/components/ui/loading";
import { useAuth } from "@/contexts/auth/auth-context";
import { axios } from "@/lib/axios";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { useQuery } from "react-query";
import colors from "tailwindcss/colors";

// tentar pegar a tipagem do backend :D
export interface Exam {
  description: string;
  examStartDate: Date;
  examEndDate: Date;
}

// tentar pegar a tipagem do backend :D
export interface Event {
  id: number;
  eventName: string;
  registrationCost: number;
  registrationStartDate: Date;
  registrationEndDate: Date;
  coursesAmount: number;
  modalities: string;
  examList: Exam[];
}

const fetchEventQuery = (): Promise<Event[]> =>
  axios.get("/event").then(({ data }) => data.eventList);

export default function HomeScreen() {
  const { token } = useAuth();

  const {
    data: eventList,
    refetch: fetchEventList,
    isLoading,
  } = useQuery("events", fetchEventQuery);

  useEffect(() => {
    fetchEventList();
  }, [token]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchEventList} />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 64 }}
    >
      <Image source={HeaderImage} className="absolute" />
      <View className="h-full p-4 pt-16 space-y-4">
        <Text className="text-base font-semibold text-white">
          Comissão Permanente do Vestibular
        </Text>

        <View className="flex-row items-center space-x-2">
          <Feather name="home" color={colors.white} size={16} />
          <Text className="text-white">•</Text>
          <Text className="text-white">Processos Seletivos</Text>
        </View>

        {isLoading ? <LoadingContainer /> : <EventList eventList={eventList} />}
      </View>
    </ScrollView>
  );
}
