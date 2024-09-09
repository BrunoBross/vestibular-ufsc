import { getEventList } from "@/service/event-service";
import { FastifyInstance } from "fastify";

export const getEvents = async (fastify: FastifyInstance) => {
  fastify.get("/event", async (_, reply) => {
    const eventList = await getEventList();

    reply.send({ eventList });
  });
};
