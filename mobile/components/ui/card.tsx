import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface CardProps extends ViewProps {}

export function Card(props: CardProps) {
  const { className, children, ...rest } = props;

  return (
    <View
      className={twMerge("p-4 bg-white rounded-md shadow-md", className)}
      {...rest}
    >
      {children}
    </View>
  );
}
