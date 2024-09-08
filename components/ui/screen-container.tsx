import { StatusBar, Text, View, ViewProps } from "react-native";

interface ScreenContainerProps extends ViewProps {
  title?: string;
}

export function ScreenContainer(props: ScreenContainerProps) {
  const { title, className, children, ...rest } = props;

  return (
    <View
      className="p-4"
      style={{ marginTop: StatusBar.currentHeight }}
      {...rest}
    >
      {title && <Text className="mb-2 text-base font-bold">{title}</Text>}

      {children}
    </View>
  );
}
