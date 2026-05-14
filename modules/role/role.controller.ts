import type { Request, Response } from "express";
import { RoleService } from "./role.service.js";


export class RoleController {
    static async addRole(req:Request, res:Response) {
        const role = await RoleService.create(req.body);
        return res.status(201).json({success:true, message:"Role created successfully",data:role});
    }
}