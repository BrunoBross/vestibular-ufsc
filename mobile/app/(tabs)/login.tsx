import { LoginModel, loginSchema } from "@/components/screens/login/validator";
import { Form } from "@/components/ui/form";
import { ScreenContainer } from "@/components/ui/screen-container";
import { useAuth } from "@/contexts/auth/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

export default function LoginScreen() {
  const { control, handleSubmit } = useForm<LoginModel>({
    resolver: zodResolver(loginSchema),
  });

  const { login, token } = useAuth();

  const onSubmit = async (values: LoginModel) => {
    await login(values);
  };

  return (
    <ScreenContainer title="Área do Candidato">
      {token ? (
        <Text>Usuário logado</Text>
      ) : (
        <View className="pt-32 gap-y-4">
          <Form.Input
            name="cpf"
            control={control}
            label="CPF"
            maskType="cpf"
            maxLength={14}
            placeholder="000.000.000-00"
          />
          <Form.Input
            name="password"
            control={control}
            label="Senha"
            placeholder="**********"
            secureTextEntry={true}
          />
          <Form.SubmitButton
            title="Entrar"
            titleAlign="center"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      )}
    </ScreenContainer>
  );
}
