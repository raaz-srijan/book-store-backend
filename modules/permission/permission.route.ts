import {Router} from "express";
import { PermissionController } from "./permission.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

route.post("/add", protect, restrictTo("admin"), PermissionController.addPermission);

export default route;