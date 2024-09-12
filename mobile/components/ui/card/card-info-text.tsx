import { ReactNode } from "react";
import { Text } from "react-native";

interface CardInfoTextProps {
  children: ReactNode;
  prefix?: string;
}

export function CardInfoText(props: CardInfoTextProps) {
  const { children, prefix } = props;

  return (
    <Text>
      {prefix && <Text className="font-bold">{prefix} </Text>}
      {children}
    </Text>
  );
}
