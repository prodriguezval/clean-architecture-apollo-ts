import { injectable } from "tsyringe";
import { ProductDataProviderConfiguration } from "product/configuration/ProductDataProviderConfiguration";
import { ProductDataProvider } from "product/domain/provider/ProductDataProvider";
import { GetAllProductsUseCase } from "product/usecase/GetAllProductsUseCase";

@injectable()
export class ProductUseCaseConfiguration {
  private readonly productDataProvider: ProductDataProvider;
  constructor(
    productDataProviderConfiguration: ProductDataProviderConfiguration
  ) {
    this.productDataProvider =
      productDataProviderConfiguration.getDataProvider();
  }

  public getAllProductsUseCase(): GetAllProductsUseCase {
    return new GetAllProductsUseCase(this.productDataProvider);
  }
}
