import "reflect-metadata";
import { ApolloServer } from "apollo-server-fastify";
import { userSchema } from "user/infrastructure/graphql/userSchema";
import { userResolver } from "user/infrastructure/graphql/userResolver";
import { container } from "tsyringe";
import { UserDataProviderConfiguration } from "user/configuration/UserDataProviderConfiguration";
import { GetUserByIdUseCase } from "user/usecase/GetUserByIdUseCase";

describe("User GraphQL Operation", () => {
  let server: ApolloServer;
  const GET_USER_BY_ID = `
    query user($id: ID!){
      user(id: $id){
        id
        name
        address
      }
    }
  `;
  beforeAll(async () => {
    const userUseCaseConfiguration =
      container.resolve<UserDataProviderConfiguration>(
        UserDataProviderConfiguration
      );

    server = new ApolloServer({
      typeDefs: userSchema,
      resolvers: userResolver,
      context: () => {
        return {
          getUserByIdUseCase: new GetUserByIdUseCase(
            userUseCaseConfiguration.getDataProvider()
          ),
        };
      },
    });
    await server.start();
  });

  it("if the user ID exists, must return a user", async () => {
    const id = "1";
    const { data, errors } = await server.executeOperation({
      query: GET_USER_BY_ID,
      variables: { id },
    });
    expect(errors).toBeUndefined();
    expect(data).not.toBeNull();

    expect(data?.user.name).toEqual("Nova");
    expect(data?.user.address).toEqual("El peumo");
    expect(data?.user.id).toEqual(id);
  });

  it("if the user ID doesn't exists, must return a error", async () => {
    const id = "non-existing-id";
    const { data, errors } = await server.executeOperation({
      query: GET_USER_BY_ID,
      variables: { id },
    });
    expect(data?.user).toBeNull();
    expect(errors).not.toBeUndefined();
    expect(errors?.length).toEqual(1);
    expect(errors?.[0].message).toEqual("Error getting user");
  });

  afterAll(async () => {
    await server.stop();
  });
});
