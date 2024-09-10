import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

interface ScreenContainerProps extends ViewProps {
  title?: string;
  canGoBack?: boolean;
}

export function ScreenContainer(props: ScreenContainerProps) {
  const { title, canGoBack, children, ...rest } = props;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View
      className="w-full h-full p-4"
      style={{ marginTop: StatusBar.currentHeight }}
      {...rest}
    >
      <View className="flex-row items-center gap-x-2">
        {canGoBack && (
          <TouchableOpacity onPress={handleGoBack}>
            <Feather name="arrow-left" size={22} />
          </TouchableOpacity>
        )}

        {title && <Text className="text-base font-bold ">{title}</Text>}
      </View>

      <View className="mt-2">{children}</View>
    </View>
  );
}
