import HeaderImage from "@/assets/images/app/header.png";
import { EventList } from "@/components/screens/home/event-list";
import { LoadingContainer } from "@/components/ui/loading";
import { axios } from "@/lib/axios";
import { Feather } from "@expo/vector-icons";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { useQuery } from "react-query";
import colors from "tailwindcss/colors";

// tentar pegar a tipagem do backend :D
export interface Exam {
  description: string;
  examStartDate: Date;
  examEndDate: Date;
}

export interface ExamLocation {
  location: string;
  section: string;
  group: string;
  order: number;
}

export interface Option {
  name: string;
  campus: string;
  classified: boolean;
  option: number;
}

export interface Candidate {
  name: string;
  registrationCode: string;
  registrationPaid: boolean;
  secondLanguage: string;
  trainer: boolean;
  paa: string;
}

export interface Wait {
  option: Option;
  order: number;
  category: string;
  period: string;
}

export interface Result {
  classified: Wait;
  waitList: Wait[];
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
  image: string;
  examList: Exam[];
  examLocation?: ExamLocation;
  candidate?: Candidate;
  options?: Option[];
  result?: Result;
}

export interface BasicEvent {
  id: number;
  eventName: string;
  registrationStartDate: Date;
  registrationEndDate: Date;
  examList: Exam[];
  registered: boolean;
  registrationPaid: boolean;
  image: string;
}

const fetchEventQuery = (): Promise<BasicEvent[]> =>
  axios.get("/event").then(({ data }) => data.eventList);

export default function HomeScreen() {
  const {
    data: eventList,
    refetch: fetchEventList,
    isLoading,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEventQuery,
  });

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
