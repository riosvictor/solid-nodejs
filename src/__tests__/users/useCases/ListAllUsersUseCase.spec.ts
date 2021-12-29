import "reflect-metadata";
import { container } from "tsyringe";
import { v4 } from "uuid";

import { UsersRepository } from "../../../modules/users/repositories/implementations/UsersRepository";
import { ListAllUsersUseCase } from "../../../modules/users/useCases/listAllUsers/ListAllUsersUseCase";

describe("ListAllUsersUseCase", () => {
  let usersRepository: UsersRepository;
  let listAllUsersUseCase: ListAllUsersUseCase;
  let userId: string;

  beforeAll(() => {
    listAllUsersUseCase = container.resolve(ListAllUsersUseCase);
  });

  it("should be able to list all users", async () => {
    const user1 = await usersRepository.create({
      name: "Danilo Vieira",
      email: "danilo@rocketseat.com",
    });

    const user2 = await usersRepository.create({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
    });

    userId = user2.id;

    const user3 = await usersRepository.create({
      name: "Joseph Oliveira",
      email: "dogim@rocketseat.com",
    });

    await usersRepository.turnAdmin(user1);

    const users = await listAllUsersUseCase.execute({ user_id: user1.id });

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Danilo Vieira",
          email: "danilo@rocketseat.com",
        }),
        user2,
        user3,
      ])
    );
  });

  it("should not be able to a non admin user get list of all users", () => {
    expect(async () => {
      await listAllUsersUseCase.execute({ user_id: userId });
    }).toThrow();
  });

  it("should not be able to a non existing user get list of all users", () => {
    expect(async () => {
      await listAllUsersUseCase.execute({ user_id: v4() });
    }).toThrow();
  });
});
