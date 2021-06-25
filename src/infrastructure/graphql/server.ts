import "reflect-metadata";
import { ApolloServer } from "apollo-server-fastify";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import fastify from "fastify";
import cookie from "fastify-cookie";
import { validateRequest } from "infrastructure/graphql/middleware/validateRequest";
import { contextBuilder } from "infrastructure/graphql/middleware/contextBuilder";
import { logger } from "infrastructure/logger/loggerConfig";
const app = fastify();
const port = 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextBuilder,
  plugins: [
    {
      requestDidStart(requestContext) {
        return {
          didResolveOperation() {
            return validateRequest(requestContext);
          },
        };
      },
    },
  ],
});

(async function () {
  await server.start();
  app.register(cookie);
  app.register(server.createHandler());
  await app.listen(port);
  logger().info("GraphQL server started");
})();
