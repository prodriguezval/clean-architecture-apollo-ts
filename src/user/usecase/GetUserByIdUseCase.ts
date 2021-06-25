import { UserDataProvider } from "user/domain/provider/UserDataProvider";
import { User } from "user/domain/entity/User";

export class GetUserByIdUseCase {
  constructor(private userDataProvider: UserDataProvider) {}

  public execute(id: string): User {
    return this.userDataProvider.getUserById(id);
  }
}
