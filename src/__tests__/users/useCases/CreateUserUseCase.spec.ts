import { User } from "modules/users/entities/User";
import { container } from "tsyringe";
import { getRepository } from "typeorm";

import { UsersRepository } from "../../../modules/users/repositories/implementations/UsersRepository";
import { CreateUserUseCase } from "../../../modules/users/useCases/createUser/CreateUserUseCase";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepository: UsersRepository;

  beforeAll(() => {
    createUserUseCase = container.resolve(CreateUserUseCase);
  });

  beforeEach(async () => {
    await getRepository(User).clear();
  });

  it("should be able to create new users", async () => {
    const user = await createUserUseCase.execute({
      name: "Danilo Vieira",
      email: "danilo@rocketseat.com",
    });

    expect(usersRepository.list()).toStrictEqual([user]);
  });

  it("should not be able to create new users when email is already taken", () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Danilo Vieira",
        email: "danilo@rocketseat.com",
      });
    }).toThrow();
  });
});
