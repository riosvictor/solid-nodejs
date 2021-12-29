import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../error/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError("admin user not found", 404);
    if (!user.admin) throw new AppError("user is not admin");

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
