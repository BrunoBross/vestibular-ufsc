import { FastifyInstance } from "fastify";
import {
  getUserNotification,
  sendNotification,
} from "./notification-controller";

export const notificationRoutes = async (fastify: FastifyInstance) => {
  fastify.register(sendNotification);
  fastify.register(getUserNotification);
};
