import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getIsUserAuthenticated } from "../auth/auth-utils";
import {
  findEventById,
  getEventCandidateList,
  getEventList,
} from "./event-service";

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

export const getCandidateEvents = async (fastify: FastifyInstance) => {
  fastify.get(
    "/event/candidate",
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const eventCandidateList = await getEventCandidateList(
        request.user.userToken
      );

      reply.send({ eventCandidateList });
    }
  );
};

export const getEvents = async (fastify: FastifyInstance) => {
  fastify.get("/event", async (request, reply) => {
    const eventList = await getEventList();

    reply.send({ eventList });
  });
};
