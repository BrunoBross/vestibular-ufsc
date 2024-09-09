import { FastifyInstance } from "fastify";
import { findEvent } from "./find-event";
import { getCandidateEvents } from "./get-candidate-events";
import { getEvents } from "./get-events";

export const eventRoutes = async (fastify: FastifyInstance) => {
  fastify.register(getEvents);
  fastify.register(findEvent);
  fastify.register(getCandidateEvents);
};
