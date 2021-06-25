import { ApolloError } from "apollo-server-fastify";
import { logger } from "infrastructure/logger/loggerConfig";
import { GetAllProductsUseCase } from "product/usecase/GetAllProductsUseCase";

export const productResolver = {
  Query: {
    products: async (root: any, params: any, context: any) => {
      try {
        logger().info("Getting products info");
        const getAllProductsUseCase =
          context.getAllProductsUseCase as GetAllProductsUseCase;
        return getAllProductsUseCase.execute();
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
