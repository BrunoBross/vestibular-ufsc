import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/auth/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { LoginModel, loginSchema } from "./validator";

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginModel>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (values: LoginModel) => {
    await login(values);
  };

  return (
    <View className="pt-32 space-y-4">
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
  );
}
