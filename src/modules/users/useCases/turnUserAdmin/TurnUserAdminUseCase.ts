import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../error/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class TurnUserAdminUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError("user not found", 404);

    return this.usersRepository.turnAdmin({ id: user_id });
  }
}

export { TurnUserAdminUseCase };
