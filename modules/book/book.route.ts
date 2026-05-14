import { Router } from "express";
import { BookController } from "./book.controller.js";
import upload from "../../shared/middlewares/upload.middleware.js";

const route = Router();

route.get("/", BookController.getBooks);
route.get("/:bookId", BookController.getBookById);
route.post("/", BookController.addBook);
route.patch("/:bookId", upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'gallery', maxCount: 6 }
]), BookController.updateBook);
route.delete("/:bookId", BookController.deleteBook);

export default route;