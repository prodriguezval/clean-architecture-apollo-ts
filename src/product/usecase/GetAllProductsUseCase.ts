import { ProductDataProvider } from "product/domain/provider/ProductDataProvider";
import { Product } from "product/domain/entity/Product";

export class GetAllProductsUseCase {
  constructor(private productDataProvider: ProductDataProvider) {}

  public execute(): Product[] {
    return this.productDataProvider.getAllProducts();
  }
}
