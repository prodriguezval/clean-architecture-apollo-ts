import "reflect-metadata";
import { ApolloServer } from "apollo-server-fastify";
import { container } from "tsyringe";
import { ProductUseCaseConfiguration } from "product/configuration/ProductUseCaseConfiguration";
import { productSchema } from "product/infrastructure/graphql/productSchema";
import { productResolver } from "product/infrastructure/graphql/productResolver";

/**
 * @group integration
 */
describe("Product Operations", () => {
  let server: ApolloServer;
  const GET_ALL_PRODUCTS = `
    query {
      products {
        id
        name
        quantity
      }
    }
  `;
  beforeAll(async () => {
    const productUseCaseConfiguration =
      container.resolve<ProductUseCaseConfiguration>(
        ProductUseCaseConfiguration
      );
    server = new ApolloServer({
      typeDefs: productSchema,
      resolvers: productResolver,
      context: () => {
        return {
          getAllProductsUseCase:
            productUseCaseConfiguration.getAllProductsUseCase(),
        };
      },
    });
    await server.start();
  });

  it("should return all products", async () => {
    const expectedProducts = [
      { id: "1", name: "Rice", quantity: 5 },
      { id: "2", name: "Diapers", quantity: 5 },
      { id: "3", name: "Orange", quantity: 5 },
    ];
    const { data, errors } = await server.executeOperation({
      query: GET_ALL_PRODUCTS,
    });
    expect(errors).toBeUndefined();
    expect(data?.products).toHaveLength(3);
    expect(data?.products[0]).toMatchObject(expectedProducts[0]);
    expect(data?.products[1]).toMatchObject(expectedProducts[1]);
    expect(data?.products[2]).toMatchObject(expectedProducts[2]);
  });

  afterAll(async () => {
    await server.stop();
  });
});
