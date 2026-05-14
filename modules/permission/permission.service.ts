import { AppError } from "../../shared/errors/AppError.js";
import { Permission, type IPermission } from "./permission.model.js";

export class PermissionServices {
    static async create(data:IPermission) {
        if(!data.name || !data.group)
            throw new AppError("Please fill all the required fields", 400);

        const normalizedName = data.name.toLowerCase().trim();
        const existPerm = await Permission.findOne({name:normalizedName});

        if(existPerm)
            throw new AppError("Permission with the same name already exists", 409);

        const newPerm = await Permission.create({name:normalizedName, group:data.group, isActive:true});

        return newPerm;
    }

    static async read() {
        const perm = await Permission.find();
        if(!perm)
            throw new AppError("Permission not found", 404);

        return perm;
    }

    static async readById(id:string) {
        const perm = await Permission.findById(id);

        if(!perm)
            throw new AppError("Permisison not found", 404);

        return perm;
    }
}