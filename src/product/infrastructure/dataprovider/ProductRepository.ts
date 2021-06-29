import { Product } from "product/domain/entity/Product";
import { ProductDataProvider } from "product/domain/provider/ProductDataProvider";

export class ProductRepository implements ProductDataProvider {
  allProducts: Product[] = [
    { id: "1", name: "Rice", quantity: 5 },
    { id: "2", name: "Diapers", quantity: 5 },
    { id: "3", name: "Orange", quantity: 5 },
  ];
  getAllProducts(): Promise<Product[]> {
    return Promise.resolve(this.allProducts);
  }
}
