import { registerAuth } from "@/lib/auth";
import { fastify } from "@/lib/fastify";
import "dotenv/config";
import { routes } from "./routes";

import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";

registerAuth(fastify);

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.setErrorHandler(errorHandler);

fastify.register(routes);

const startServer = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
      console.log("Server is running on localhost:3000 🚀");
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startServer();
