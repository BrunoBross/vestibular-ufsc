import { Href, router } from "expo-router";
import { ReactNode } from "react";
import { BaseButton } from "./base-button";

interface LinkButtonProps {
  href: Href;
  children: ReactNode;
  rippleColor?: string;
}

export function LinkButton(props: LinkButtonProps) {
  const { href, rippleColor, children } = props;

  const onClick = () => {
    router.push(href);
  };

  return (
    <BaseButton rippleColor={rippleColor || "#52525b40"} onPress={onClick}>
      {children}
    </BaseButton>
  );
}
