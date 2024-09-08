import HeaderImage from "@/assets/images/app/header.png";
import { EventCard } from "@/components/ui/screens/event-card";
import { Feather } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";
import colors from "tailwindcss/colors";

export default function HomeScreen() {
  return (
    <ScrollView>
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

        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </View>
    </ScrollView>
  );
}
