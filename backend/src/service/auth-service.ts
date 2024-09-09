import { axios } from "@/lib/axios";
import { LoginType } from "@/routes/auth/login";

export async function findUser({ cpf, password }: LoginType) {
  const userToken: string = await axios
    .post("/api/v1/login", {
      cpf: cpf,
      senha: password,
    })
    .then(({ data }) => data?.access_token)
    .catch((error) => {
      console.log(error);
    });

  return userToken;
}
