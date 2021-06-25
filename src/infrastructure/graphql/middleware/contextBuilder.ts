import { FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { ProductUseCaseConfiguration } from "product/configuration/ProductUseCaseConfiguration";
import { UserUseCaseConfiguration } from "user/configuration/UserUseCaseConfiguration";

const userUseCaseConfiguration = container.resolve<UserUseCaseConfiguration>(
  UserUseCaseConfiguration
);

const productUseCaseConfiguration =
  container.resolve<ProductUseCaseConfiguration>(ProductUseCaseConfiguration);

export const contextBuilder = ({ request }: { request: FastifyRequest }) => {
  return {
    cookies: request.cookies,
    headers: request.headers,
    getAllProductsUseCase: productUseCaseConfiguration.getAllProductsUseCase(),
    getUserByIdUseCase: userUseCaseConfiguration.getUserByIdUseCase(),
  };
};
