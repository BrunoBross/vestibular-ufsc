import { FastifyInstance } from "fastify";
import { login } from "./login";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.register(login);
};
