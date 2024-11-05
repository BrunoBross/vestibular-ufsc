import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

interface CardInfoTextProps extends TextProps {
  children: ReactNode;
  prefix?: string;
}

export function CardInfoText(props: CardInfoTextProps) {
  const { children, prefix, ...rest } = props;

  return (
    <Text {...rest}>
      {prefix && <Text className="font-bold">{prefix} </Text>}
      {children || "-"}
    </Text>
  );
}
