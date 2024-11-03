import { sendNotificationToDevice } from "@/app/notification/notification-service";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

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
