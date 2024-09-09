import { useController } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import {
  TextInputMask,
  TextInputMaskProps,
  TextInputMaskTypeProp,
} from "react-native-masked-text";
import { ControlledInputProps } from "./types";

interface MaskedInputProps
  extends Omit<TextInputMaskProps, "type">,
    ControlledInputProps {
  label?: string;
  maskType?: TextInputMaskTypeProp;
}

export function Input(props: MaskedInputProps) {
  const { name, control, maskType, label, ...rest } = props;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <View className="gap-y-1" {...rest}>
      {label && <Text className="font-bold text-zinc-600">{label}</Text>}
      {maskType ? (
        <TextInputMask
          className="px-4 py-3 bg-white rounded-md shadow-md"
          value={value}
          onChangeText={onChange}
          type={maskType}
          {...rest}
        />
      ) : (
        <TextInput
          className="px-4 py-3 bg-white rounded-md shadow-md"
          value={value}
          onChangeText={onChange}
          {...rest}
        />
      )}
      {error && (
        <Text className="font-medium text-red-200">{error.message}</Text>
      )}
    </View>
  );
}
