import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface ScreenContainerTitleProps extends TextProps {}

export function ScreenContainerTitle(props: ScreenContainerTitleProps) {
  const { className, ...rest } = props;

  return (
    <Text className={twMerge("text-base font-bold", className)} {...rest} />
  );
}
