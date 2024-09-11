import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/auth-context";
import { Text, View } from "react-native";

export function UserLogged() {
  const { logout } = useAuth();

  return (
    <View className="space-y-2">
      <Text>Usuário logado</Text>
      <Button title="Deslogar" onPress={logout} />
    </View>
  );
}
