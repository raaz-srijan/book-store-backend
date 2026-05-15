import { Router } from "express";
import { VendorController } from "./vendor.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { requirePermission, restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

// A logged-in user can request to become a vendor
route.post("/request", protect, VendorController.requestVendor);

// Admin / SuperUsers can view and manage requests
route.get("/", protect, restrictTo("admin"), requirePermission("read_vendors"), VendorController.getAllVendorRequest);
route.get("/:id", protect, restrictTo("admin"), requirePermission("read_vendors"), VendorController.getVendorRequestById);

route.patch("/:id/approve", protect, restrictTo("admin"), requirePermission("approve_vendors"), VendorController.approveVendorRequest);
route.patch("/:id/reject", protect, restrictTo("admin"), requirePermission("approve_vendors"), VendorController.resjectVendorRequest);

export default route;
