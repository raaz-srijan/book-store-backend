import { Router } from "express";
import { AuthorController } from "./author.controller.js";
import upload from "../../shared/middlewares/upload.middleware.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

route.get("/", AuthorController.getAuthors);
route.get("/all", AuthorController.getAllAuthors);
route.get("/:id", AuthorController.getAuthorById);
route.post("/", protect, restrictTo("admin", "vendor"), upload.single("image"), AuthorController.addAuthor);
route.patch("/:id", protect, restrictTo("admin", "vendor"), upload.single("image"), AuthorController.updateAuthor);
route.delete("/:id", protect, restrictTo("admin"), AuthorController.deleteAuthor);

export default route;