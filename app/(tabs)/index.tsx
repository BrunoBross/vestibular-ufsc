import HeaderImage from "@/assets/images/app/header.png";
import VestibularUfscImage from "@/assets/images/app/vestibular-ufsc.png";
import { Feather } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import colors from "tailwindcss/colors";

export default function HomeScreen() {
  return (
    <View>
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

        <View className="flex-row p-4 bg-white rounded-md">
          <Image source={VestibularUfscImage} />
          <View className="ml-4 gap-y-1">
            <Text className="text-blue-100">4898341 - BRUNO BARRETO</Text>
            <Text>Vestibular Unificado UFSC/IFSC 2024-2</Text>
            <View className="flex-row items-center gap-x-1">
              <Feather name="calendar" color={colors.gray[200]} size={16} />
              <Text className="font-medium text-gray-200">Inscrições</Text>
            </View>
            <Text>De 18/04/2024 10:00 a 14/05/2024 23:59</Text>
            <View className="flex-row items-center gap-x-1">
              <Feather name="book-open" color={colors.gray[300]} size={16} />
              <Text className="font-medium text-gray-200">Prova(s)</Text>
            </View>
            <Text>Prova - 23/06/2024 14:00</Text>
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
      </View>
    </View>
  );
}
