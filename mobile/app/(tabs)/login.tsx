import { LoginForm } from "@/components/screens/login/login-form";
import { UserLogged } from "@/components/screens/login/user-logged";
import { ScreenContainer } from "@/components/ui/screen-container";
import { useAuth } from "@/contexts/auth/auth-context";

export default function LoginScreen() {
  const { token } = useAuth();

  return (
    <ScreenContainer title="Área do Candidato">
      {token ? <UserLogged /> : <LoginForm />}
    </ScreenContainer>
  );
}
