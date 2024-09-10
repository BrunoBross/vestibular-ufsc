import clsx from "clsx";
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
}

export function Button(props: ButtonProps) {
  const { title, icon, titleAlign = "left", ...rest } = props;

  return (
    <View {...rest}>
      <BaseButton {...rest}>
        <View
          className={clsx("p-4 flex-row bg-sky-500 items-center rounded-md", {
            "justify-center": titleAlign === "center",
            "justify-start": titleAlign === "left",
            "justify-end": titleAlign === "right",
          })}
        >
          {icon && <View className="mr-2">{icon}</View>}
          <Text className="font-semibold text-white">{title}</Text>
        </View>
      </BaseButton>
    </View>
  );
}
