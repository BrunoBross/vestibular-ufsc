import { Href, router } from "expo-router";
import { BaseButton, BaseButtonProps } from "./base-button";

interface LinkButtonProps extends BaseButtonProps {
  href: Href;
}

export function LinkButton(props: LinkButtonProps) {
  const { href, rippleColor, children } = props;

  const onClick = () => {
    router.push(href);
  };

  return (
    <BaseButton rippleColor={rippleColor || "#52525b30"} onPress={onClick}>
      {children}
    </BaseButton>
  );
}
