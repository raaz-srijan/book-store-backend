import { Router } from "express";
import { InventoryController } from "./inventory.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { requirePermission, restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

// Dashboard & General
route.get("/alerts/low-stock", protect, restrictTo("admin", "vendor"), requirePermission("read_inventory"), InventoryController.getLowStock);
route.get("/book/:bookId", protect, restrictTo("admin", "vendor"), requirePermission("read_inventory"), InventoryController.getBookInventory);

// Management
route.post("/", protect, restrictTo("admin", "vendor"), requirePermission("write_inventory"), InventoryController.addInventory);
route.patch("/:id", protect, restrictTo("admin", "vendor"), requirePermission("write_inventory"), InventoryController.updateInventory);
route.patch("/:id/adjust-stock", protect, restrictTo("admin", "vendor"), requirePermission("write_inventory"), InventoryController.adjustStock);
route.delete("/:id", protect, restrictTo("admin", "vendor"), requirePermission("delete_inventory"), InventoryController.deleteInventory);

export default route;