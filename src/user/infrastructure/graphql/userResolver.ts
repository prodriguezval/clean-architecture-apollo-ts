import { ApolloError } from "apollo-server-fastify";
import { GetUserByIdUseCase } from "user/usecase/GetUserByIdUseCase";
import { logger } from "infrastructure/logger/loggerConfig";

export const userResolver = {
  Query: {
    user: async (root: any, params: any, context: any) => {
      try {
        const { id }: { id: string } = params;
        logger().info(`Getting user with id: ${id}`);
        const userByIdUseCase: GetUserByIdUseCase = context.getUserByIdUseCase;
        return userByIdUseCase.execute(id);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
