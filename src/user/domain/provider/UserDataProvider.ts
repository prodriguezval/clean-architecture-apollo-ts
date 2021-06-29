import { User } from "user/domain/entity/User";

export interface UserDataProvider {
  getUserById(id: string): Promise<User>;
}
