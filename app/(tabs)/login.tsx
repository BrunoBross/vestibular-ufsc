import { LoginModel, loginSchema } from "@/components/screens/home/validator";
import { Form } from "@/components/ui/form";
import { ScreenContainer } from "@/components/ui/screen-container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function LoginScreen() {
  const { control, handleSubmit } = useForm<LoginModel>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <ScreenContainer title="Área do Candidato">
      <View className="pt-32 gap-y-4">
        <Form.MaskedInput
          name="cpf"
          control={control}
          type="cpf"
          maxLength={14}
          placeholder="000.000.000-00"
        />
        <Form.Input
          name="password"
          control={control}
          placeholder="**********"
          secureTextEntry={true}
        />
        <Form.SubmitButton
          title="Entrar"
          titleAlign="center"
          onPress={handleSubmit(onSubmit, console.log)}
        />
      </View>
    </ScreenContainer>
  );
}
