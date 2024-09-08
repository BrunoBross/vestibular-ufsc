import { Button } from "@/components/ui/button";
import { ScreenContainer } from "@/components/ui/screen-container";
import { Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  return (
    <ScreenContainer title="Área do Candidato">
      <View className="pt-32 gap-y-4">
        <View className="gap-y-1">
          <Text className="font-semibold">CPF</Text>
          <TextInput
            className="px-4 py-2 bg-white rounded-md shadow-md"
            placeholder="000.000.000-00"
          />
        </View>
        <View className="gap-y-1">
          <Text className="font-semibold">CPF</Text>
          <TextInput
            className="px-4 py-2 bg-white rounded-md shadow-md"
            placeholder="**********"
            secureTextEntry={true}
          />
        </View>
        <Button title="Entrar" titleAlign="center" />
      </View>
    </ScreenContainer>
  );
}
