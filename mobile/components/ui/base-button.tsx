import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

export interface BaseButtonProps extends TouchableNativeFeedbackProps {
  rippleColor: string;
}

export function BaseButton(props: BaseButtonProps) {
  const { rippleColor, children, ...rest } = props;

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(rippleColor, false)}
      {...rest}
    >
      {children}
    </TouchableNativeFeedback>
  );
}
