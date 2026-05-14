import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";

const route = Router();

route.post("/login", AuthController.login);
route.post("/refresh", AuthController.refresh);
route.post("/logout", protect, AuthController.logout);

export default route;