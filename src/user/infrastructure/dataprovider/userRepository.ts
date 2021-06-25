import { User } from "user/domain/entity/User";
import { UserDataProvider } from "user/domain/provider/UserDataProvider";

export class UserRepository implements UserDataProvider {
  allUsers: User[] = [
    { name: "Nova", address: "El peumo", id: "1" },
    { name: "Sunny", address: "Las cimas", id: "2" },
    { name: "Vega", address: "Los volcanes", id: "3" },
  ];

  getUserById(id: string): User {
    const user = this.allUsers.find((user) => user.id === id);
    if (user === undefined) {
      throw new Error(`User ${id} not found`);
    }
    return user;
  }
}
