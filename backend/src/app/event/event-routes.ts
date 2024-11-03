import { FastifyInstance } from "fastify";
import { findEvent, getCandidateEvents, getEvents } from "./event-controller";

export const eventRoutes = async (fastify: FastifyInstance) => {
  fastify.register(getEvents);
  fastify.register(findEvent);
  fastify.register(getCandidateEvents);
};
