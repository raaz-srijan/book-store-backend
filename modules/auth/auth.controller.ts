import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";


export class AuthController {
    static async login(req:Request, res:Response) {
        const user = await AuthService.login(req.body);

        return res.status(200).json({success:true, message:"Login successfully", data:user});
    }
}