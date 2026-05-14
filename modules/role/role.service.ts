import { AppError } from "../../shared/errors/AppError.js";
import { PermissionServices } from "../permission/permission.service.js";
import { Role } from "./role.model.js"; // Assuming you have a Role model
import type { IRole } from "./role.model.js";

export class RoleService {
    static async create(data: IRole) {
        const { name, permissions } = data;

        if (!name || !permissions || permissions.length === 0) {
            throw new AppError("Please fill all the required fields", 400);
        }

        const validPermissions = [];
        for (const permId of permissions) {
            const permission = await PermissionServices.readById(permId.toString());
            if (!permission) {
                throw new AppError(`Permission not found: ${permId}`, 404);
            }
            validPermissions.push(permission._id);
        }

        const role = await Role.create({
            name,
            permissions: validPermissions,
        });

        const safeRole = role.toObject();
        return safeRole;
    }

    static async getById(id:string) {
        const role = await Role.findById(id);

        if(!role)
            throw new AppError("Role not found", 404);

        return role;
    }

    static async getRoleName(name:string) {
       return await Role.findOne({name});
    }
}