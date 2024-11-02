import { ClientError } from "@/errors/client-error";
import { findEventById } from "@/service/event-service";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const findEventParamsSchema = z.object({
  id: z.coerce.number(),
});

export const findEvent = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    "/event/:id",
    {
      schema: { params: findEventParamsSchema },
    },
    async (request, reply) => {
      let userToken = "";

      await fastify
        .authenticate(request, reply)
        .then(() => (userToken = request.user.userToken));

      const event = await findEventById(
        request.params.id,
        request.user?.userToken
      );

      if (!event) {
        throw new ClientError("Event not found");
      }

      reply.send({ event });
    }
  );
};
