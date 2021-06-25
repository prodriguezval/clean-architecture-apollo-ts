import { Product } from "product/domain/entity/Product";

export interface ProductDataProvider {
  getAllProducts(): Product[];
}
