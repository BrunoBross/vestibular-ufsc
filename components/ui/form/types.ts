import { Control } from "react-hook-form";

export interface ControlledInputProps {
  name: string;
  control: Control<any, any>;
}
