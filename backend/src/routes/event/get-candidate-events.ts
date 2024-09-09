import { getCandidateEventList } from "@/service/event-service";
import { FastifyInstance } from "fastify";

export const getCandidateEvents = async (fastify: FastifyInstance) => {
  fastify.get(
    "/event/candidate",
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const candidateEventList = await getCandidateEventList(
        request.user.userToken
      );

      reply.send({ candidateEventList });
    }
  );
};
