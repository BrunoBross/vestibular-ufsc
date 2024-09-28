import clsx from "clsx";
import { Href, router } from "expo-router";
import { ReactNode } from "react";
import {
  Text,
  TouchableNativeFeedbackProps,
  View,
  ViewProps,
} from "react-native";
import { BaseButton } from "./base-button";

type TitleAlign = "left" | "center" | "right";

export interface ButtonProps extends ViewProps, TouchableNativeFeedbackProps {
  title: string;
  icon?: ReactNode;
  titleAlign?: TitleAlign;
  href?: Href;
  isLoading?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    title,
    icon,
    titleAlign = "left",
    href,
    onPress,
    children,
    ...rest
  } = props;

  const handleNavigate = () => {
    router.push(href!);
  };

  return (
    <View {...rest}>
      <BaseButton onPress={href ? handleNavigate : onPress} {...rest}>
        <View
          className={clsx("p-4 flex-row bg-sky-500 items-center rounded-md", {
            "justify-center": titleAlign === "center",
            "justify-start": titleAlign === "left",
            "justify-end": titleAlign === "right",
          })}
        >
          {children || (
            <>
              <Text className="font-semibold text-white">{title}</Text>
              {icon && (
                <View className="absolute right-0 p-2 mr-2">{icon}</View>
              )}
            </>
          )}
        </View>
      </BaseButton>
    </View>
  );
}
