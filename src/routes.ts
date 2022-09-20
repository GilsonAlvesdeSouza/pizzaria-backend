import { Router } from "express";
import { UserController } from "./controllers/user/UserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();
const userController = new UserController();
const authUserController = new AuthUserController();

router.post("/users", userController.store);
router.post("/session", authUserController.auth);
router.get("/users/me", isAuthenticated, userController.detailUser);

export { router };
