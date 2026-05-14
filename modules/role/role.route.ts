import {Router} from "express";
import { RoleController } from "./role.controller.js";

const route = Router();

route.post("/add", RoleController.addRole);

export default route;