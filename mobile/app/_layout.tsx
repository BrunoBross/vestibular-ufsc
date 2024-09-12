import { FocusManager } from "@/components/focus-manager";
import { AuthProvider } from "@/contexts/auth/auth-context";
import { queryCLient } from "@/lib/query-client";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import { QueryClientProvider } from "react-query";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryCLient}>
      <FocusManager>
        <AuthProvider>
          <View className="w-screen h-screen">
            <ExpoStatusBar style="dark" />

            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </View>
        </AuthProvider>
      </FocusManager>
    </QueryClientProvider>
  );
}
