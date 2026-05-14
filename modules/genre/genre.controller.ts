import { GenreService } from "./genre.service.js";
import type { Request, Response } from "express";

export class GenreController {

    static addGenre = async (req: Request, res: Response) => {
        const newGenre = await GenreService.addGenre(req.body);
        res.status(201).json({ success: true, data: newGenre });
    }

    static updateGenre = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const updatedGenre = await GenreService.updateGenre(id.toString(), req.body);
        res.status(200).json({ success: true, data: updatedGenre });
    }

    static deleteGenre = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        await GenreService.deleteGenre(id.toString());
        res.status(200).json({ success: true, message: "Genre deleted" });
    }

    static getAllGenres = async (req: Request, res: Response) => {
        const genres = await GenreService.getAllGenres();
        res.status(200).json({ success: true, data: genres });
    }

    static getGenres = async (req: Request, res: Response) => {
        const genres = await GenreService.getGenres();
        res.status(200).json({ success: true, data: genres });
    }

    static getGenreById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const genre = await GenreService.getGenreById(id.toString());
        res.status(200).json({ success: true, data: genre });
    }

    static toggleGenre = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const data = await GenreService.toggleGenreActive(id.toString());
        res.status(200).json({
            success: true,
            message: `Genre is now ${data.isActive ? "Active" : "Inactive"}`
        });
    }
}