import "reflect-metadata";
import { container } from "tsyringe";
import { v4 } from "uuid";

import { UsersRepository } from "../../../modules/users/repositories/implementations/UsersRepository";
import { TurnUserAdminUseCase } from "../../../modules/users/useCases/turnUserAdmin/TurnUserAdminUseCase";

describe("TurnUserAdminUseCase", () => {
  let usersRepository: UsersRepository;
  let turnUserAdminUseCase: TurnUserAdminUseCase;

  beforeAll(() => {
    turnUserAdminUseCase = container.resolve(TurnUserAdminUseCase);
  });

  it("should be able to turn an user as admin", async () => {
    const user = await usersRepository.create({
      name: "Joseph Oliveira",
      email: "dogim@rocketseat.com",
    });

    const updatedUser = await turnUserAdminUseCase.execute({
      user_id: user.id,
    });

    expect(updatedUser.admin).toBe(true);
    expect(usersRepository.list()).toStrictEqual(
      expect.arrayContaining([updatedUser])
    );
  });

  it("should not be able to turn a non existing user as admin", () => {
    expect(async () => {
      await turnUserAdminUseCase.execute({ user_id: v4() });
    }).toThrow();
  });
});
