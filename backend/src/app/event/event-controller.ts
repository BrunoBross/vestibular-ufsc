import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getIsUserAuthenticated } from "../auth/auth-utils";
import { findEventById, getEventList } from "./event-service";

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
      const { userToken } = await getIsUserAuthenticated(fastify, request);

      const event = await findEventById(request.params.id, userToken);

      reply.send({ event });
    }
  );
};

export const getEvents = async (fastify: FastifyInstance) => {
  fastify.get(
    "/event",
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const eventList = await getEventList(request.user.userToken);

      reply.send({ eventList });
    }
  );
};
