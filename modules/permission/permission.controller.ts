import type { Request, Response } from "express";
import { PermissionServices } from "./permission.service.js";

export class PermissionController {
    static async addPermission(req:Request, res:Response) {
        const perm = await PermissionServices.create(req.body);
        return res.status(201).json({success:true, message:"Permission added successfully", data:perm});
    }
}