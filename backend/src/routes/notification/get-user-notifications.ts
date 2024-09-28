import { getUserNotificationsByCpf } from "@/service/notification-service";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

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
