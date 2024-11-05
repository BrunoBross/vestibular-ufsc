import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import {
  getUserNotificationsByCpf,
  sendNotificationToDevice,
} from "./notification-service";

const getUserNotificationParamsSchema = z.object({
  cpf: z.string(),
});

export type GetUserNotificationType = z.infer<
  typeof getUserNotificationParamsSchema
>;

export const getUserNotification = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get(
      "/notification/:cpf",
      { schema: { params: getUserNotificationParamsSchema } },
      async (request, reply) => {
        console.log("oi");
        const notifications = await getUserNotificationsByCpf(
          request.params.cpf
        );

        return { notifications };
      }
    );
};

const sendNotificationBodySchema = z.object({
  title: z.string(),
  message: z.string(),
});

export type NotificationType = z.infer<typeof sendNotificationBodySchema>;

export const sendNotification = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/notification",
      { schema: { body: sendNotificationBodySchema } },
      async (request, reply) => {
        await sendNotificationToDevice(request.body);
      }
    );
};
