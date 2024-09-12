import { ReactNode, useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import { focusManager } from "react-query";

interface FocusManagerProps {
  children: ReactNode;
}

export function FocusManager(props: FocusManagerProps) {
  const { children } = props;

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return children;
}
