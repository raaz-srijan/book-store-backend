import { Router } from "express";
import { CategoryController } from "./category.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { requirePermission, restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

route.get("/", CategoryController.getCategories);

route.get("/all", CategoryController.getAllCategories);
route.post("/", protect, restrictTo("admin", "vendor"), requirePermission("write_categories"), CategoryController.addCat);

route.get("/:id", CategoryController.getCatById);
route.patch("/:id", protect, restrictTo("admin", "vendor"), requirePermission("write_categories"), CategoryController.updateCat);
route.delete("/:id", protect, restrictTo("admin"), requirePermission("delete_categories"), CategoryController.deleteCat);

route.patch("/:id/toggle", protect, restrictTo("admin"), requirePermission("write_categories"), CategoryController.toggleCat);

export default route;