import { BaseContext, GraphQLRequestContext } from "apollo-server-types";

const operationsRequireAuthentication = ["payments", "user"];

export const validateRequest = (
  requestContext: GraphQLRequestContext<BaseContext>
) => {
  const request = requestContext.request;
  const requestContainsOperation = operationsRequireAuthentication.some(
    (operation) => request.query?.includes(operation)
  );

  if (requestContainsOperation) {
    validateHeaders(requestContext.context);
  }
};

const validateHeaders = (context: BaseContext) => {
  const headers = context.headers;

  if (!headers) {
    throw new Error("Invalid request");
  }

  const authorization = headers.authorization;
  const cookies = context.cookies;
  if (!authorization || !cookies) {
    throw new Error("UNAUTHORIZED");
  }
};
