import { mock, MockProxy } from "jest-mock-extended";
import { UserDataProvider } from "user/domain/provider/UserDataProvider";
import { User } from "user/domain/entity/User";
import { GetUserByIdUseCase } from "user/usecase/GetUserByIdUseCase";

describe("Get user by ID use case", () => {
  let userDataProvider: MockProxy<UserDataProvider>;
  let getUserByIdUseCase: GetUserByIdUseCase;
  beforeEach(() => {
    userDataProvider = mock<UserDataProvider>();
    getUserByIdUseCase = new GetUserByIdUseCase(userDataProvider);
  });
  it("If the user ID exists, an user should be returned", async () => {
    const id = "1";
    const user: User = { id, name: "Odi", address: "Las Cimas" };
    userDataProvider.getUserById.calledWith(id).mockResolvedValue(user);
    const result = await getUserByIdUseCase.execute(id);

    expect(result.id).toEqual(user.id);
    expect(result.name).toEqual(user.name);
    expect(result.address).toEqual(user.address);
  });
  it("If the user ID doesn't exists, an error should be thrown", async () => {
    const id = "1";
    await userDataProvider.getUserById
      .calledWith(id)
      .mockRejectedValueOnce("User not found");
    await expect(getUserByIdUseCase.execute(id)).rejects.toThrow(Error);
  });
});
