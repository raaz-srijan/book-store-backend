import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class UserController {
    static register = catchAsync(async (req: Request, res: Response) => {
        const user = await UserService.createUser(req.body);
        return res.status(201).json({success:true, message:"User registered successfully", data:user});
    });

    static update = catchAsync(async (req: Request, res: Response) => {
        if(!req.user)
            return res.status(403).json({success:false, message:"Please login"});

        const userId = req.user._id.toString();
        const user = await UserService.updateUser(userId, req.body);
        return res.status(200).json({success:true, message:"User updated successfully", data:user});
    });
}