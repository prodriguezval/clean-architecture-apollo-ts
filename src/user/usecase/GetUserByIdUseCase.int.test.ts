import "reflect-metadata";
import { container } from "tsyringe";
import { UserDataProviderConfiguration } from "user/configuration/UserDataProviderConfiguration";
import { GetUserByIdUseCase } from "user/usecase/GetUserByIdUseCase";

describe("Get User By Id Integration", () => {
  let getUserByIdUseCase: GetUserByIdUseCase;
  beforeEach(() => {
    container.clearInstances();
    const userUseCaseConfiguration =
      container.resolve<UserDataProviderConfiguration>(
        UserDataProviderConfiguration
      );
    getUserByIdUseCase = new GetUserByIdUseCase(
      userUseCaseConfiguration.getDataProvider()
    );
  });
  it("if the user ID exists, must return a user", async () => {
    const id = "1";
    const result = await getUserByIdUseCase.execute(id);
    expect(result.name).toEqual("Nova");
    expect(result.address).toEqual("El peumo");
    expect(result.id).toEqual(id);
  });

  it("if the user ID doesn't exists, must return a error", async () => {
    const id = "non-existing-id";
    try {
      await getUserByIdUseCase.execute(id);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.message).toEqual("Error getting user");
    }
  });
});
