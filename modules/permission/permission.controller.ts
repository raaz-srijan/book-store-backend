import type { Request, Response } from "express";
import { PermissionServices } from "./permission.service.js";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class PermissionController {
    static addPermission = catchAsync(async (req: Request, res: Response) => {
        const perm = await PermissionServices.create(req.body);
        return res.status(201).json({success:true, message:"Permission added successfully", data:perm});
    });
}