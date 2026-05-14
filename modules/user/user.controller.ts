import type { Request, Response } from "express";
import { UserService } from "./user.service.js";


export class UserController {
    static async register(req:Request, res:Response) {
        const user = await UserService.createUser(req.body);
        return res.status(201).json({success:true, message:"User registered successfully", data:user});
    }

    static async update(req:Request, res:Response) {
        if(!req.user)
            return res.status(403).json({success:false, message:"Please login"});

        const userId = req.user._id.toString();
        const user = await UserService.updateUser(userId, req.body);
        return res.status(200).json({success:true, message:"User updated successfully", data:user});
    }

    
}