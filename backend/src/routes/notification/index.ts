import { FastifyInstance } from "fastify";
import { getUserNotification } from "./get-user-notifications";
import { sendNotification } from "./send-notification";

export const notificationRoutes = async (fastify: FastifyInstance) => {
  fastify.register(sendNotification);
  fastify.register(getUserNotification);
};
