import { Router } from "express";
import { GenreController } from "./genre.controller.js";
import { protect } from "../../shared/middlewares/auth.middleware.js";
import { restrictTo } from "../../shared/middlewares/rbac.middleware.js";

const route = Router();

route.get("/", GenreController.getGenres);
route.get("/all", GenreController.getAllGenres);
route.get("/:id", GenreController.getGenreById);

route.post("/", protect, restrictTo("admin", "vendor"), GenreController.addGenre);

route.patch("/:id", protect, restrictTo("admin", "vendor"), GenreController.updateGenre);
route.patch("/:id/toggle", protect, restrictTo("admin", "vendor"), GenreController.toggleGenre);

route.delete("/:id", protect, restrictTo("admin", "vendor"), GenreController.deleteGenre);

export default route;