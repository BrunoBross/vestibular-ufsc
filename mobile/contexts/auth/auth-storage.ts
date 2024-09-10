import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStoreState {
  token?: string;
  setToken: (token?: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token?: string) => set({ token }),
      clearToken: () => set({ token: undefined }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
