import { ClientError } from "@/errors/client-error";
import { findUser } from "@/service/auth-service";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const loginBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
});

export type LoginType = z.infer<typeof loginBodySchema>;

export const login = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/login",
      { schema: { body: loginBodySchema } },
      async (request, reply) => {
        const userToken = await findUser(request.body);

        if (!userToken) {
          throw new ClientError("Incorrect username or password");
        }

        const token = fastify.jwt.sign({ userToken: userToken });

        reply.send({ token });
      }
    );
};
