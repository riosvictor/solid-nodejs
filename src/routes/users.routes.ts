import { Router } from "express";

import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { ListAllUsersController } from "../modules/users/useCases/listAllUsers/ListAllUsersController";
import { ShowUserProfileController } from "../modules/users/useCases/showUserProfile/ShowUserProfileController";
import { TurnUserAdminController } from "../modules/users/useCases/turnUserAdmin/TurnUserAdminController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();
const showUserProfileController = new ShowUserProfileController();
const turnUserAdminController = new TurnUserAdminController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/:user_id/admin", turnUserAdminController.handle);

usersRoutes.get("/:user_id", showUserProfileController.handle);

usersRoutes.get("/", listAllUsersController.handle);

export { usersRoutes };
