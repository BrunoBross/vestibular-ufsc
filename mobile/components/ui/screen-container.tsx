import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { twMerge } from "tailwind-merge";

interface ScreenContainerProps extends ViewProps {
  title?: string;
  canGoBack?: boolean;
}

export function ScreenContainer(props: ScreenContainerProps) {
  const { title, canGoBack, className, children, ...rest } = props;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View
      className="h-full p-4 pb-0 space-y-4"
      style={{ paddingTop: StatusBar.currentHeight! + 20 }}
    >
      {canGoBack && (
        <View className="flex-row items-center gap-x-2">
          <TouchableOpacity onPress={handleGoBack}>
            <Feather name="arrow-left" size={22} />
          </TouchableOpacity>

          <Text className="text-base font-bold ">Voltar</Text>
        </View>
      )}

      {title && <Text className="text-base font-bold ">{title}</Text>}

      <ScrollView
        className={twMerge("mt-2", className)}
        contentContainerStyle={{ paddingBottom: 64 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}
