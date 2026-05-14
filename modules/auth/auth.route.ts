import {Router} from "express";
import { AuthController } from "./auth.controller.js";

const route = Router();


route.post("/login", AuthController.login);

export default route;