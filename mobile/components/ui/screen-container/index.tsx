import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { ScreenContainerTitle } from "./screen-container-text";

interface ScreenContainerProps {
  title?: string | ReactNode;
  canGoBack?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  className?: ClassNameValue;
  children?: ReactNode;
}

export function ScreenContainer(props: ScreenContainerProps) {
  const {
    title,
    canGoBack,
    isLoading = false,
    onRefresh,
    className,
    children,
  } = props;

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

          <ScreenContainerTitle className="text-base font-bold ">
            Voltar
          </ScreenContainerTitle>
        </View>
      )}

      {title && typeof title === "string" ? (
        <ScreenContainerTitle className="text-base font-bold ">
          {title}
        </ScreenContainerTitle>
      ) : (
        title
      )}

      <ScrollView
        className={twMerge("mt-2", className)}
        contentContainerStyle={{ paddingBottom: 64 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh && (
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          )
        }
      >
        {children}
      </ScrollView>
    </View>
  );
}
