import type { Request, Response } from "express";
import { AuthorService } from "./author.service.js";


export class AuthorController {
    static async addAuthor(req:Request, res:Response) {
        const newAuthor = await AuthorService.addAuthor(req.body, req.files);
        return res.status(201).json({success:true, message:"Author added successfully", data:newAuthor});
    }

    static async updateAuthor(req:Request, res:Response) {
        const {id} = req.params;
        if(!id)
            return res.status(404).json({success:false, message:"Invalid id"});
        const update = await AuthorService.updateAuthor(id.toString(), req.body, req.files);

        return res.status(200).json({success:true, message:"Author updated successfully", data:update});
    }

    static async deleteAuthor(req:Request, res:Response) {
        const {id} = req.params;

        if(!id)
            return res.status(404).json({success:false, message:"Invalid id"});

        const author = await AuthorService.deleteAuthor(id.toString());
        return res.status(200).json({success:true, message:"Author deleted successfully"});
    }

    static async getAuthors(req:Request, res:Response) {
        const authors = await AuthorService.getAuthors();
        
        return res.status(200).json({success:true, message:"Authors fetched successfully",data:authors});
    }

    static async getAllAuthors(req:Request, res:Response) {
        const authors = await AuthorService.getAllAuthors();

        return res.status(200).json({success:true, message:"All authors fetched successfully", data:authors});
    }

    static async getAuthorById(req:Request, res:Response) {
        const {id} = req.params;

        if(!id)
            return res.status(404).json({success:false, message:"Invalid id"});
        
        const author = await AuthorService.getAuthorById(id.toString());
        return res.status(200).json({success:true, message:"Author fetched successfully", data:author});
    }
}