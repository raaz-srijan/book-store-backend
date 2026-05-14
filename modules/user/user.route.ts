import {Router} from "express";
import { UserController } from "./user.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";

const route = Router();

route.post("/register", UserController.register);
route.patch("/update", protect, UserController.update);

export default route;