import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth";
import { eventRoutes } from "./event";

export const routes = async (fastify: FastifyInstance) => {
  fastify.get("/", (_, reply) => {
    reply.send("Hello from server!");
  });

  fastify.register(authRoutes);
  fastify.register(eventRoutes);
};
