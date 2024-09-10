import clsx from "clsx";
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
  titleAlign?: TitleAlign;
}

export function Button(props: ButtonProps) {
  const { title, titleAlign = "left", ...rest } = props;

  return (
    <View {...rest}>
      <BaseButton {...rest}>
        <View
          className={clsx("p-4 bg-sky-500 rounded-md", {
            "items-center": titleAlign === "center",
            "items-start": titleAlign === "left",
            "items-end": titleAlign === "right",
          })}
        >
          <Text className="font-semibold text-white">{title}</Text>
        </View>
      </BaseButton>
    </View>
  );
}
