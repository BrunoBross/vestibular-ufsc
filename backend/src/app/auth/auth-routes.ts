import { FastifyInstance } from "fastify";
import { login } from "./auth-controller";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.register(login);
};
