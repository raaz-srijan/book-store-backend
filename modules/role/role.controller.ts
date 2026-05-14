import type { Request, Response } from "express";
import { RoleService } from "./role.service.js";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class RoleController {
    static addRole = catchAsync(async (req: Request, res: Response) => {
        const role = await RoleService.create(req.body);
        return res.status(201).json({success:true, message:"Role created successfully",data:role});
    });
}