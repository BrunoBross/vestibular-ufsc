import { ClientError } from "@/errors/client-error";
import Jwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply } from "fastify";

import { FastifyRequest } from "fastify";

export const registerAuth = async (fastify: FastifyInstance) => {
  fastify.register(Jwt, { secret: "supersecret" });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        throw new ClientError("Unauthorized");
      }
    }
  );
};
