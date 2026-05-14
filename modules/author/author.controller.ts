import type { Request, Response } from "express";
import { AuthorService } from "./author.service.js";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class AuthorController {
    static addAuthor = catchAsync(async (req: Request, res: Response) => {
        const newAuthor = await AuthorService.addAuthor(req.body, req.files);
        return res.status(201).json({success:true, message:"Author added successfully", data:newAuthor});
    });

    static updateAuthor = catchAsync(async (req: Request, res: Response) => {
        const {id} = req.params;
        if(!id)
            return res.status(404).json({success:false, message:"Invalid id"});
        const update = await AuthorService.updateAuthor(id.toString(), req.body, req.files);

        return res.status(200).json({success:true, message:"Author updated successfully", data:update});
    });

    static deleteAuthor = catchAsync(async (req: Request, res: Response) => {
        const {id} = req.params;

        if(!id)
            return res.status(404).json({success:false, message:"Invalid id"});

        const author = await AuthorService.deleteAuthor(id.toString());
        return res.status(200).json({success:true, message:"Author deleted successfully"});
    });

    static getAuthors = catchAsync(async (req: Request, res: Response) => {
        const authors = await AuthorService.getAuthors();
        
        return res.status(200).json({success:true, message:"Authors fetched successfully",data:authors});
    });

    static getAllAuthors = catchAsync(async (req: Request, res: Response) => {
        const authors = await AuthorService.getAllAuthors();

        return res.status(200).json({success:true, message:"All authors fetched successfully", data:authors});
    });

    static getAuthorById = catchAsync(async (req: Request, res: Response) => {
        const {id} = req.params;

        if(!id)
            return res.status(404).json({success:false, message:"Invalid id"});
        
        const author = await AuthorService.getAuthorById(id.toString());
        return res.status(200).json({success:true, message:"Author fetched successfully", data:author});
    });
}