import HeaderImage from "@/assets/images/app/header.png";
import { EventCard } from "@/components/screens/home/event-card";
import { useAuth } from "@/contexts/auth/auth-context";
import { axios } from "@/lib/axios";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
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

export default function HomeScreen() {
  const { token } = useAuth();
  const [eventList, setEventList] = useState<Event[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchEventList = async () => {
    setIsFetching(true);
    await axios
      .get("/event")
      .then(({ data }) => {
        setEventList(data.eventList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchEventList();
  }, [token]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={fetchEventList} />
      }
    >
      <Image source={HeaderImage} className="absolute" />
      <View className="p-4 pt-16 gap-y-4">
        <Text className="text-base font-semibold text-white">
          Comissão Permanente do Vestibular
        </Text>

        <View className="flex-row items-center gap-x-2">
          <Feather name="home" color={colors.white} size={16} />
          <Text className="text-white">•</Text>
          <Text className="text-white">Processos Seletivos</Text>
        </View>

        {eventList.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </View>
    </ScrollView>
  );
}
