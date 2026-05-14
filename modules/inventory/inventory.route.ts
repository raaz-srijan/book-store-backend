import { Router } from "express";
import { InventoryController } from "./inventory.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

route.use(protect, restrictTo("admin", "vendor"));

// Dashboard & General
route.get("/alerts/low-stock", InventoryController.getLowStock);
route.get("/book/:bookId", InventoryController.getBookInventory);

// Management
route.post("/", InventoryController.addInventory);
route.patch("/:id", InventoryController.updateInventory);
route.patch("/:id/adjust-stock", InventoryController.adjustStock);
route.delete("/:id", InventoryController.deleteInventory);

export default route;