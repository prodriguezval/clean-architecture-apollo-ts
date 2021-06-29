import { UserDataProvider } from "user/domain/provider/UserDataProvider";
import { User } from "user/domain/entity/User";

export class GetUserByIdUseCase {
  constructor(private userDataProvider: UserDataProvider) {}

  public async execute(id: string): Promise<User> {
    try {
      return await this.userDataProvider.getUserById(id);
    } catch (e) {
      throw new Error("Error getting user");
    }
  }
}
