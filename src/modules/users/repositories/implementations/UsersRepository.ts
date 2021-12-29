import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
    });

    return this.repository.save(user);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async turnAdmin(receivedUser: User): Promise<User> {
    const user = await this.repository.findOne(receivedUser.id);

    user.admin = true;

    return this.repository.save(user);
  }

  async list(): Promise<User[]> {
    return this.repository.find();
  }
}

export { UsersRepository };
