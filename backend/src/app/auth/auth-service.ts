import { ClientError } from "@/errors/client-error";
import { axios } from "@/lib/axios";
import { prisma } from "@/lib/prisma";
import { LoginType } from "@/routes/auth/login";

export async function loginUser({ cpf, password, expoToken }: LoginType) {
  const userToken: string = await axios
    .post("/api/v1/login", {
      cpf: cpf,
      senha: password,
    })
    .then(({ data }) => data?.access_token)
    .catch((error) => {
      console.log(error);
    });

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
}
