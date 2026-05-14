import { Router } from "express";
import { AuthorController } from "./author.controller.js";
import upload from "../../shared/middlewares/upload.middleware.js";

const route = Router();

route.get("/", AuthorController.getAuthors);
route.get("/all", AuthorController.getAllAuthors);
route.get("/:id", AuthorController.getAuthorById);
route.post("/", upload.single("image"), AuthorController.addAuthor);
route.patch("/:id", upload.single("image"), AuthorController.updateAuthor);
route.delete("/:id", AuthorController.deleteAuthor);

export default route;