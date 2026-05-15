import { Router } from "express";
import { AuthorController } from "./author.controller.js";
import upload from "../../shared/middlewares/upload.middleware.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { requirePermission, restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

//GET
route.get("/", AuthorController.getAuthors);
route.get("/all", AuthorController.getAllAuthors);
route.get("/:id", AuthorController.getAuthorById);

//POST
route.post("/", protect, restrictTo("admin", "vendor"), requirePermission("write_authors"), upload.single("image"), AuthorController.addAuthor);

//PATCH
route.patch("/:id", protect, restrictTo("admin", "vendor"), requirePermission("write_authors"), upload.single("image"), AuthorController.updateAuthor);

//DELETE
route.delete("/:id", protect, restrictTo("admin"), requirePermission("delete_authors"), AuthorController.deleteAuthor);

export default route;