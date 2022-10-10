import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { UserController } from "./controllers/user/UserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CategoryController } from "./controllers/category/CategoryController";
import { ProductController } from "./controllers/product/ProductController";

const router = Router();
const upload = multer(uploadConfig.upload("products"));
const userController = new UserController();
const authUserController = new AuthUserController();
const categoryController = new CategoryController();
const productController = new ProductController();

router.post("/users", userController.store);
router.post("/session", authUserController.auth);
router.get("/users/me", isAuthenticated, userController.detailUser);

router.get("/categories", isAuthenticated, categoryController.index);
router.post("/categories", isAuthenticated, categoryController.store);

router.post(
  "/products",
  isAuthenticated,
  upload.single("file"),
  productController.store
);

export { router };
