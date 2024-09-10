import { LoginModel } from "@/components/screens/login/validator";
import { axios } from "@/lib/axios";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useAuthStore } from "./auth-storage";

interface AuthContextType {
  token?: string;
  login: (values: LoginModel) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;

  const { token, setToken, clearToken } = useAuthStore();

  const login = async (values: LoginModel) => {
    await axios
      .post("/login", values)
      .then(({ data }) => {
        setToken(data.token);
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    clearToken();
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      axios.defaults.headers.Authorization = null;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
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
