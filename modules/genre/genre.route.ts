import { Router } from "express";
import { GenreController } from "./genre.controller.js";

const route = Router();

route.get("/", GenreController.getGenres);
route.get("/all", GenreController.getAllGenres);
route.get("/:id", GenreController.getGenreById);

route.post("/", GenreController.addGenre);

route.patch("/:id", GenreController.updateGenre);
route.patch("/:id/toggle", GenreController.toggleGenre);

route.delete("/:id", GenreController.deleteGenre);

export default route;