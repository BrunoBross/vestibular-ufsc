import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/auth-context";
import { formatCPF } from "@/utils/format-cpf";
import { Text, View } from "react-native";

export function UserLogged() {
  const { logout, cpf } = useAuth();

  return (
    <View className="space-y-2">
      <Text className="text-base">
        Usuário de CPF: <Text className="font-semibold">{formatCPF(cpf)}</Text>{" "}
        está logado
      </Text>
      <Button title="Sair" titleAlign="center" onPress={logout} />
    </View>
  );
}
