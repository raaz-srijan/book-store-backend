import {Router} from "express";
import { PermissionController } from "./permission.controller.js";

const route = Router();

route.post("/add", PermissionController.addPermission);

export default route;