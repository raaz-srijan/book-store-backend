import { Router } from "express";
import { BookController } from "./book.controller.js";
import upload from "../../shared/middlewares/upload.middleware.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

route.get("/", BookController.getBooks);
route.get("/:slug", BookController.getBookBySlug);

route.post("/", protect, restrictTo("admin", "vendor"), BookController.addBook);

route.patch("/:id", protect, restrictTo("admin", "vendor"), upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'gallery', maxCount: 6 }
]), BookController.updateBook);

route.patch("/:id/toggle", protect, restrictTo("admin"), BookController.toggleVerification);

route.delete("/:id", protect, restrictTo("admin", "vendor"), BookController.deleteBook);

export default route;