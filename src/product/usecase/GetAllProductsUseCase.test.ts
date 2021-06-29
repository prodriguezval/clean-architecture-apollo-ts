import { ProductDataProvider } from "product/domain/provider/ProductDataProvider";
import { mock, MockProxy } from "jest-mock-extended";
import { GetAllProductsUseCase } from "product/usecase/GetAllProductsUseCase";
import { Product } from "product/domain/entity/Product";

describe("Get all Products Use Case", () => {
  let productDataProvider: MockProxy<ProductDataProvider>;
  let getAllProductsUseCase: GetAllProductsUseCase;
  beforeEach(() => {
    productDataProvider = mock<ProductDataProvider>();
    getAllProductsUseCase = new GetAllProductsUseCase(productDataProvider);
  });
  it("should return all products", async () => {
    const products: Product[] = [{ id: "1", name: "Dog Chow", quantity: 1 }];
    productDataProvider.getAllProducts.mockResolvedValue(products);
    const result = await getAllProductsUseCase.execute();

    expect(result.length).toEqual(products.length);
    expect(result[0]).toEqual(products[0]);
  });
});
