import { ReactNode } from "react";
import { Text, View, ViewProps } from "react-native";

interface CardInfoBoxProps extends ViewProps {
  title: string;
  children: ReactNode;
}

export function CardInfoBox(props: CardInfoBoxProps) {
  const { title, children, ...rest } = props;

  return (
    <View {...rest}>
      <Text className="mb-1 font-bold">{title}</Text>
      {children}
    </View>
  );
}
