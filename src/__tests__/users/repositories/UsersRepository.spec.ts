import "reflect-metadata";
import { getRepository } from "typeorm";
import { validate } from "uuid";

import { User } from "../../../modules/users/entities/User";
import { UsersRepository } from "../../../modules/users/repositories/implementations/UsersRepository";

describe("UsersRepository", () => {
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    await getRepository(User).clear();
  });

  it("should be able to create new users", async () => {
    const user = await usersRepository.create({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
    });

    expect(user).toMatchObject({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
      admin: false,
    });
    expect(validate(user.id)).toBe(true);
    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.updated_at).toBeInstanceOf(Date);
  });

  it("should be able to list all users", async () => {
    const user = await usersRepository.create({
      name: "Danilo Vieira",
      email: "danilo@rocketseat.com",
    });

    const users = await usersRepository.list();

    expect(users).toStrictEqual(expect.arrayContaining([user]));
  });

  it("should be able to find user by ID", async () => {
    const user = await usersRepository.create({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
    });

    const findUser = await usersRepository.findById(user.id);

    expect(findUser).toMatchObject({
      name: user.name,
      email: user.email,
      admin: false,
    });
    expect(validate(findUser.id)).toBe(true);
    expect(findUser.created_at).toBeInstanceOf(Date);
    expect(findUser.updated_at).toBeInstanceOf(Date);
  });

  it("should be able to find user by e-mail address", async () => {
    const user = await usersRepository.create({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
    });

    const findUser = await usersRepository.findByEmail(user.email);

    expect(findUser).toMatchObject({
      name: user.name,
      email: user.email,
      admin: false,
    });
    expect(validate(findUser.id)).toBe(true);
    expect(findUser.created_at).toBeInstanceOf(Date);
    expect(findUser.updated_at).toBeInstanceOf(Date);
  });

  it("should be able to turn an user as admin", async () => {
    const user = await usersRepository.create({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
    });

    const admin = await usersRepository.turnAdmin(user);

    expect(admin).toMatchObject({
      name: user.name,
      email: user.email,
      admin: true,
    });
    expect(validate(admin.id)).toBe(true);
    expect(admin.created_at).toBeInstanceOf(Date);
    expect(admin.updated_at).toBeInstanceOf(Date);
  });
});
