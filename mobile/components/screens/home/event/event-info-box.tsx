import { ReactNode } from "react";
import { Text, View, ViewProps } from "react-native";

interface EventInfoBoxProps extends ViewProps {
  title: string;
  children: ReactNode;
}

export function EventInfoBox(props: EventInfoBoxProps) {
  const { title, children, ...rest } = props;

  return (
    <View {...rest}>
      <Text className="mb-1 font-bold">{title}</Text>
      {children}
    </View>
  );
}
