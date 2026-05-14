import { BookService } from "./book.service.js";
import type { Request, Response } from "express";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class BookController {

    static addBook = catchAsync(async (req: Request, res: Response) => {
        const newBook = await BookService.addBook(req.body);
        res.status(201).json({
            success: true,
            message: "Book added and awaiting verification",
            data: newBook
        });
    });

    static updateBook = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });

        const updatedBook = await BookService.updateBook(id.toString(), req.body);
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        });
    });

    static getBooks = catchAsync(async (req: Request, res: Response) => {
        const books = await BookService.getBooks(req.query);
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    });

    static getBookBySlug = catchAsync(async (req: Request, res: Response) => {
        const { slug } = req.params;
        if (!slug)
            return res.status(404).json({ success: false, message: "Invalid slug" });
        const book = await BookService.getBookBySlug(slug.toString());
        res.status(200).json({
            success: true,
            data: book
        });
    });

    static toggleVerification = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        const book = await BookService.toggleVerification(id.toString());
        res.status(200).json({
            success: true,
            message: `Book is now ${book.isVerified ? "Verified" : "Unverified"}`,
            data: book
        });
    });

    static deleteBook = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(404).json({ success: false, message: "Invalid id" });
        await BookService.deleteBook(id.toString());
        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    });
}