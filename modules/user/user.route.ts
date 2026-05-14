import {Router} from "express";
import { UserController } from "./user.controller.js";

const route = Router();

route.post("/register", UserController.register);
route.patch("/update", UserController.update);

export default route;