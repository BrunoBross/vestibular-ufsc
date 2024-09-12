import { QueryClient } from "react-query";

import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "react-query";

export const queryCLient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    state.isConnected && setOnline(state.isConnected);
  });
});
