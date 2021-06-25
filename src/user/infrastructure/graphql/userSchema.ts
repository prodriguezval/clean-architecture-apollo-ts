import { gql } from "apollo-server-fastify";

export const userSchema = gql`
  type User {
    id: ID!
    name: String
    address: String
  }

  type Query {
    user(id: ID!): User
  }
`;
