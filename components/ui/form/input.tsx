import { useController } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { ControlledInputProps } from "./types";

interface InputProps extends TextInputProps, ControlledInputProps {}

export function Input(props: InputProps) {
  const { name, control, ...rest } = props;

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <View className="gap-y-1" {...rest}>
      <Text className="font-semibold">CPF</Text>
      <TextInput
        className="px-4 py-3 bg-white rounded-md shadow-md"
        value={value}
        onChangeText={onChange}
        {...rest}
      />
    </View>
  );
}
