import { injectable } from "tsyringe";
import { UserDataProvider } from "user/domain/provider/UserDataProvider";
import { GetUserByIdUseCase } from "user/usecase/GetUserByIdUseCase";
import { UserDataProviderConfiguration } from "user/configuration/UserDataProviderConfiguration";

@injectable()
export class UserUseCaseConfiguration {
  private readonly userDataProvider: UserDataProvider;
  constructor(userDataProviderConfiguration: UserDataProviderConfiguration) {
    this.userDataProvider = userDataProviderConfiguration.getDataProvider();
  }

  public getUserByIdUseCase(): GetUserByIdUseCase {
    return new GetUserByIdUseCase(this.userDataProvider);
  }
}
