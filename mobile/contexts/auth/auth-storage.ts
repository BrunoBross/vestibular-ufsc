import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStoreState {
  cpf?: string;
  setCpf: (cpf?: string) => void;
  token?: string;
  setToken: (token?: string) => void;
  expoToken?: string;
  setExpoToken: (expoToken?: string) => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: undefined,
      cpf: undefined,
      setCpf: (cpf?: string) => set({ cpf }),
      setToken: (token?: string) => set({ token }),
      expoToken: undefined,
      setExpoToken: (expoToken?: string) => set({ expoToken }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
