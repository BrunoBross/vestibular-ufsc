import { z } from "zod";

export const loginSchema = z.object({
  cpf: z.string(),
  password: z.string(),
});

export type LoginModel = z.infer<typeof loginSchema>;
