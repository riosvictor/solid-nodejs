import { AppError } from "../../../../error/AppError";
import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
    });

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async turnAdmin(user: User): Promise<User> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex < 0) {
      throw new AppError("user not found", 404);
    }

    this.users[userIndex].admin = true;

    return this.users[userIndex];
  }

  async list(): Promise<User[]> {
    return this.users;
  }
}

export { UsersRepositoryInMemory };
