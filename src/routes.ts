import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { UserController } from "./controllers/user/UserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CategoryController } from "./controllers/category/CategoryController";
import { ProductController } from "./controllers/product/ProductController";
import { OrderController } from "./controllers/order/OrderController";

const router = Router();
const upload = multer(uploadConfig.upload("products"));
const userController = new UserController();
const authUserController = new AuthUserController();
const categoryController = new CategoryController();
const productController = new ProductController();
const orderController = new OrderController();

router.post("/users", userController.store);
router.post("/session", authUserController.auth);
router.get("/users/me", isAuthenticated, userController.detailUser);

router.get("/categories", isAuthenticated, categoryController.index);
router.post("/categories", isAuthenticated, categoryController.store);

router.get("/products", isAuthenticated, productController.index);
router.post(
  "/products",
  isAuthenticated,
  upload.single("file"),
  productController.store
);
router.get(
  "/products/category",
  isAuthenticated,
  productController.listByCategory
);

router.post("/orders", isAuthenticated, orderController.store);
router.delete("/orders", isAuthenticated, orderController.delete);
router.post("/orders/add/item", isAuthenticated, orderController.storeItem);
router.delete(
  "/orders/remove/item",
  isAuthenticated,
  orderController.deleteItem
);
router.put("/orders/send", isAuthenticated, orderController.sendOrder);
router.get(
  "/orders/to-do",
  isAuthenticated,
  orderController.listOrdersOutOfDraft
);
router.get("/orders/detail", isAuthenticated, orderController.detailOrder);
router.put("/orders/finish", isAuthenticated, orderController.finishOrder);

export { router };
