import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../error/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, name }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) throw new AppError("email already taken");

    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };
