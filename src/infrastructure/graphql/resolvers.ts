import { mergeResolvers } from "@graphql-tools/merge";
import { productResolver } from "product/infrastructure/graphql/productResolver";
import { userResolver } from "user/infrastructure/graphql/userResolver";

const resolvers = [productResolver, userResolver];

export default mergeResolvers(resolvers);
