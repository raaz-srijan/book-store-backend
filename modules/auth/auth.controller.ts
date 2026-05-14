import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class AuthController {
    static login = catchAsync(async (req: Request, res: Response) => {
        const user = await AuthService.login(req.body);
        return res.status(200).json({success:true, message:"Login successfully", data:user});
    });

    static refresh = catchAsync(async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        const data = await AuthService.refresh(refreshToken);
        return res.status(200).json({success:true, message:"Token refreshed", data});
    });

    static logout = catchAsync(async (req: Request, res: Response) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        const userId = req.user._id.toString();
        await AuthService.logout(userId);
        return res.status(200).json({success:true, message:"Logout successfully"});
    });
}