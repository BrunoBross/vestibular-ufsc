import { LoginModel } from "@/components/screens/login/validator";
import { LoadingContainer } from "@/components/ui/loading";
import { axios } from "@/lib/axios";
import { queryCLient } from "@/lib/query-client";
import * as Notifications from "expo-notifications";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useAuthStore } from "./auth-storage";

interface AuthContextType {
  token?: string;
  cpf?: string;
  login: (values: LoginModel) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  expoToken?: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;

  const { token, setToken, expoToken, setExpoToken, cpf, setCpf } =
    useAuthStore();

  const { mutateAsync: loginAsync, isLoading } = useMutation(
    (values: LoginModel) => axios.post("/login", values)
  );

  const login = async (values: LoginModel) => {
    loginAsync(values).then(({ data }) => {
      setToken(data.token);
      setCpf(values.cpf);
    });
  };

  const logout = () => {
    setToken(undefined);
    setCpf(undefined);
  };

  const getExpoToken = async () => {
    const expoToken = await Notifications.getExpoPushTokenAsync({
      projectId: "7c553dc8-252c-4430-b01d-3297c2e5030f",
    });

    expoToken && setExpoToken(expoToken.data);
  };

  useEffect(() => {
    getExpoToken();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      axios.defaults.headers.Authorization = null;
    }
    queryCLient.invalidateQueries(["events"]);
    queryCLient.invalidateQueries(["notification"]);
  }, [token]);

  if (axios.defaults.headers.Authorization === undefined) {
    return <LoadingContainer />;
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isLoading, expoToken, cpf }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth should be used inside an AuthProvider");
  }

  return context;
}
