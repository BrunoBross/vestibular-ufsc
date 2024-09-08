import clsx from "clsx";
import {
  Text,
  TouchableNativeFeedback,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";

type TitleAlign = "left" | "center" | "right";

export interface ButtonProps extends ViewProps, TouchableOpacityProps {
  title: string;
  titleAlign?: TitleAlign;
}

export function Button(props: ButtonProps) {
  const { title, titleAlign = "left", ...rest } = props;

  return (
    <View {...rest}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#6993FF", false)}
        {...rest}
      >
        <View
          className={clsx("p-4 bg-blue-200 rounded-md", {
            "items-center": titleAlign === "center",
            "items-start": titleAlign === "left",
            "items-end": titleAlign === "right",
          })}
        >
          <Text className="font-semibold text-white">{title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
