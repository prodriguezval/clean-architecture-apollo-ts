import { injectable } from "tsyringe";
import { ProductRepository } from "product/infrastructure/dataprovider/ProductRepository";
import { ProductDataProvider } from "product/domain/provider/ProductDataProvider";

@injectable()
export class ProductDataProviderConfiguration {
  dataProviderPerEnvironment: Record<string, ProductDataProvider> = {};
  constructor() {
    this.dataProviderPerEnvironment["dev"] = new ProductRepository();
  }

  public getDataProvider(): ProductDataProvider {
    const environment = process.env.ENVIRONMENT ?? "dev";
    return this.dataProviderPerEnvironment[environment];
  }
}
