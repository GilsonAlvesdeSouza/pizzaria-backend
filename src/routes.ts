import { Router } from "express";
import { UserController } from "./controllers/user/UserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CategoryController } from "./controllers/category/CategoryController";

const router = Router();
const userController = new UserController();
const authUserController = new AuthUserController();
const categoryController = new CategoryController();

router.post("/users", userController.store);
router.post("/session", authUserController.auth);
router.get("/users/me", isAuthenticated, userController.detailUser);

router.get("/categories", isAuthenticated, categoryController.index);
router.post("/categories", isAuthenticated, categoryController.store);

export { router };
