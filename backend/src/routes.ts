import { FastifyInstance } from "fastify";
import { authRoutes } from "./app/auth/auth-routes";
import { eventRoutes } from "./app/event/event-routes";
import { notificationRoutes } from "./app/notification/notification-routes";

export const routes = async (fastify: FastifyInstance) => {
  fastify.get("/", (_, reply) => {
    reply.send("Hello from server!");
  });

  fastify.register(authRoutes);
  fastify.register(eventRoutes);
  fastify.register(notificationRoutes);
};
