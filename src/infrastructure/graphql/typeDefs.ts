import { mergeTypeDefs } from "@graphql-tools/merge";
import { productSchema } from "product/infrastructure/graphql/productSchema";
import { userSchema } from "user/infrastructure/graphql/userSchema";

const schemaArray = [productSchema, userSchema];

export default mergeTypeDefs(schemaArray);
