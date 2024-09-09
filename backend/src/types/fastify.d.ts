export {};

type User = {
  userToken: string;
};

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
      done: (err?: Error | null, user?: User) => void
    ) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: User;
    user: User;
  }
}
