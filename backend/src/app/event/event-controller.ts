import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getIsUserAuthenticated } from "../auth/auth-utils";
import {
  findEventById,
  findPerformanceReportByEventId,
  getEventList,
} from "./event-service";

const findEventParamsSchema = z.object({
  id: z.coerce.number(),
});

const findPerformanceScoreParamsSchema = z.object({
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
  fastify.get("/event", async (request, reply) => {
    const { userToken } = await getIsUserAuthenticated(fastify, request);

    const eventList = await getEventList(userToken);

    reply.send({ eventList });
  });
};

export const getPerformanceReport = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    `/event/:id/performance`,
    {
      schema: { params: findPerformanceScoreParamsSchema },
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      const performanceReport = await findPerformanceReportByEventId(
        request.params.id,
        request.user.userToken
      );

      reply.send({ performanceReport });
    }
  );
};
