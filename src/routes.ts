import { Router } from "express";
import { UserController } from "./controllers/user/UserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
const router = Router();
const userController = new UserController();
const authUserController = new AuthUserController();

router.post("/users", userController.store);
router.post("/session", authUserController.auth);

export { router };
