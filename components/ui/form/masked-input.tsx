import { useController } from "react-hook-form";
import { Text, View } from "react-native";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";
import { ControlledInputProps } from "./types";

interface MaskedInputProps extends TextInputMaskProps, ControlledInputProps {}

export function MaskedInput(props: MaskedInputProps) {
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
      <TextInputMask
        className="px-4 py-3 bg-white rounded-md shadow-md"
        value={value}
        onChangeText={onChange}
        {...rest}
      />
    </View>
  );
}
