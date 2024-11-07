import { ClientError } from "@/errors/client-error";
import { axios, axiosHmg } from "@/lib/axios";
import { prisma } from "@/lib/prisma";
import { LoginType } from "./auth-controller";

// APENAS PARA TESTAR AS CONTAS DE HOMOLOGAÇAO
const loginUserHMG = async ({ cpf, password }: LoginType) =>
  axiosHmg
    .post("/api/v1/login", {
      cpf: cpf,
      senha: password,
    })
    .then(({ data }) => data?.access_token)
    .catch((error) => {
      console.log(error);
      throw new ClientError("Incorrect user credentials");
    });

export const loginUser = async ({ cpf, password, expoToken }: LoginType) => {
  const userToken: string = await axios
    .post("/api/v1/login", {
      cpf: cpf,
      senha: password,
    })
    .then(({ data }) => data?.access_token)
    .catch(async () => await loginUserHMG({ cpf, password }));

  if (!userToken) {
    throw new ClientError("Incorrect user credentials");
  }

  const userExists = await prisma.user.findFirst({
    where: {
      cpf: {
        equals: cpf,
      },
    },
  });

  if (userExists) {
    await prisma.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        cpf,
        expoToken,
      },
    });
  } else {
    await prisma.user.create({
      data: {
        cpf,
        expoToken,
      },
    });
  }

  return userToken;
};
