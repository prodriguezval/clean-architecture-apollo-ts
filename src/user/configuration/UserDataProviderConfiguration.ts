import { injectable } from "tsyringe";
import { UserDataProvider } from "user/domain/provider/UserDataProvider";
import { UserRepository } from "user/infrastructure/dataprovider/userRepository";

@injectable()
export class UserDataProviderConfiguration {
  dataProviderPerEnvironment: Record<string, UserDataProvider> = {};
  constructor() {
    this.dataProviderPerEnvironment["dev"] = new UserRepository();
  }

  public getDataProvider(): UserDataProvider {
    const environment = process.env.ENVIRONMENT ?? "dev";
    return this.dataProviderPerEnvironment[environment];
  }
}
