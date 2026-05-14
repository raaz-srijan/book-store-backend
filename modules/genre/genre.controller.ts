import { GenreService } from "./genre.service.js";
import type { Request, Response } from "express";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class GenreController {

    static addGenre = catchAsync(async (req: Request, res: Response) => {
        const newGenre = await GenreService.addGenre(req.body);
        res.status(201).json({ success: true, data: newGenre });
    });

    static updateGenre = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const updatedGenre = await GenreService.updateGenre(id.toString(), req.body);
        res.status(200).json({ success: true, data: updatedGenre });
    });

    static deleteGenre = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        await GenreService.deleteGenre(id.toString());
        res.status(200).json({ success: true, message: "Genre deleted" });
    });

    static getAllGenres = catchAsync(async (req: Request, res: Response) => {
        const genres = await GenreService.getAllGenres();
        res.status(200).json({ success: true, data: genres });
    });

    static getGenres = catchAsync(async (req: Request, res: Response) => {
        const genres = await GenreService.getGenres();
        res.status(200).json({ success: true, data: genres });
    });

    static getGenreById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const genre = await GenreService.getGenreById(id.toString());
        res.status(200).json({ success: true, data: genre });
    });

    static toggleGenre = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const data = await GenreService.toggleGenreActive(id.toString());
        res.status(200).json({
            success: true,
            message: `Genre is now ${data.isActive ? "Active" : "Inactive"}`
        });
    });
}