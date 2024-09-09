import { z } from "zod";

export const REQUIRED_ERROR = "Campo obrigatório";

export const INVALID_ERROR = "Campo inválido";

export const STRING = z
  .string({ message: REQUIRED_ERROR })
  .min(1, { message: REQUIRED_ERROR });

export const CPF = STRING.length(14, {
  message: INVALID_ERROR,
}).transform((cpf) => cpf.replace(/\D/g, ""));

export const PASSWORD = STRING.min(6, {
  message: "Deve possuir ao menos 6 caracteres",
});
