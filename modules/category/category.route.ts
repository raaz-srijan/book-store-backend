import { Router } from "express";
import { CategoryController } from "./category.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

route.get("/", CategoryController.getCategories);

route.get("/all", CategoryController.getAllCategories);
route.post("/", protect, restrictTo("admin", "vendor"), CategoryController.addCat);

route.get("/:id", CategoryController.getCatById);
route.patch("/:id", protect, restrictTo("admin", "vendor"), CategoryController.updateCat);
route.delete("/:id", protect, restrictTo("admin"), CategoryController.deleteCat);

route.patch("/:id/toggle", protect, restrictTo("admin"), CategoryController.toggleCat);

export default route;