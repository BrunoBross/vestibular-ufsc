import { CPF, PASSWORD } from "@/utils/validations";
import { z } from "zod";

export const loginSchema = z.object({
  cpf: CPF,
  password: PASSWORD,
});

export type LoginModel = z.infer<typeof loginSchema>;
