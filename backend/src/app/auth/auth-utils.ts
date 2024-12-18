import { FastifyInstance, FastifyRequest } from "fastify";

interface GetIsAuthenticateReturn {
  isAuthenticated: boolean;
  userToken?: string;
}

export const getIsUserAuthenticated = async (
  fastify: FastifyInstance,
  request: FastifyRequest
): Promise<GetIsAuthenticateReturn> => {
  try {
    await fastify.authenticate(request);
  } catch (error) {}

  const userToken = request.user?.userToken;

  return {
    isAuthenticated: !!userToken,
    userToken: userToken,
  };
};
