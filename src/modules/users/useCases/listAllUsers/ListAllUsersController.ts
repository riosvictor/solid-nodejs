import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      const users = this.listAllUsersUseCase.execute({
        user_id: String(user_id),
      });

      return response.status(200).json(users);
    } catch ({ message }) {
      if (message === "is not an user admin") {
        return response.status(400).json({ error: message });
      }

      return response.status(400).json({ error: message });
    }
  }
}

export { ListAllUsersController };
