import { Stack } from "expo-router";

export default function HomeLayout() {
  // return (
  //   <Stack screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="index" />
  //     <Stack.Screen name="event/[id]" />
  //     <Stack.Screen name="event/[id]/score-per-question" />
  //     <Stack.Screen name="event/[id]/individual-performance" />
  //   </Stack>
  // );

  return <Stack screenOptions={{ headerShown: false }} />;
}
