import colors from "tailwindcss/colors";
import { Button, ButtonProps } from "../button";
import { Loading } from "../loading";

interface SubmitButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export function SubmitButton(props: SubmitButtonProps) {
  const { isLoading = false, children, ...rest } = props;

  return (
    <Button {...rest}>
      {isLoading ? <Loading size={19} color={colors.white} /> : children}
    </Button>
  );
}
