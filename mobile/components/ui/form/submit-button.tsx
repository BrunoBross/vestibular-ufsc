import { Button, ButtonProps } from "../button";

interface SubmitButtonProps extends ButtonProps {}

export function SubmitButton(props: SubmitButtonProps) {
  const { ...rest } = props;

  return <Button {...rest} />;
}
