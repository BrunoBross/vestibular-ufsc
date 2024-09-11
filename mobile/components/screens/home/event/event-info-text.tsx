import { ReactNode } from "react";
import { Text } from "react-native";

interface EventInfoTextProps {
  children: ReactNode;
  prefix?: string;
}

export function EventInfoText(props: EventInfoTextProps) {
  const { children, prefix } = props;

  return (
    <Text>
      {prefix && <Text className="font-bold">{prefix} </Text>}
      {children}
    </Text>
  );
}
