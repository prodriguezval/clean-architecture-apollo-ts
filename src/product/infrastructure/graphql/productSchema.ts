import { gql } from "apollo-server-fastify";

export const productSchema = gql`
  type Product {
    id: ID!
    name: String
    quantity: Int
  }

  type Query {
    products: [Product]
  }
`;
