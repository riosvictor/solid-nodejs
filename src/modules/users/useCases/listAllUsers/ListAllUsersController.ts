import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.headers;

    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);

    const users = await listAllUsersUseCase.execute({
      user_id: String(user_id),
    });

    return response.status(200).json(users);
  }
}

export { ListAllUsersController };
