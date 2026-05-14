import { Router } from "express";
import { CategoryController } from "./category.controller.js";

const route = Router();

route.get("/", CategoryController.getCategories);

route.get("/all", CategoryController.getAllCategories);
route.post("/", CategoryController.addCat);

route.get("/:id", CategoryController.getCatById);
route.patch("/:id", CategoryController.updateCat);
route.delete("/:id", CategoryController.deleteCat);

route.patch("/:id/toggle", CategoryController.toggleCat);

export default route;