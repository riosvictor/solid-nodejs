import { User } from "../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
}

interface IUsersRepository {
  create({ name, email }: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  turnAdmin(user: User): Promise<User>;
  list(): Promise<User[]>;
}

export { IUsersRepository, ICreateUserDTO };
