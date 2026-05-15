import {Router} from "express";
import { RoleController } from "./role.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { requirePermission, restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

route.post("/add", protect, restrictTo("admin"), requirePermission("write_roles"), RoleController.addRole);

export default route;