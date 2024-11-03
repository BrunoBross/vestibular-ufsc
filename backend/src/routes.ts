import { FastifyInstance } from "fastify";
import { eventRoutes } from "./app/event/event-routes";
import { authRoutes } from "./routes/auth";
import { notificationRoutes } from "./routes/notification";

export const routes = async (fastify: FastifyInstance) => {
  fastify.get("/", (_, reply) => {
    reply.send("Hello from server!");
  });

  fastify.register(authRoutes);
  fastify.register(eventRoutes);
  fastify.register(notificationRoutes);
};
