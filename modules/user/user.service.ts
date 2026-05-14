import { AppError } from "../../shared/errors/AppError.js";
import { User, type IUser } from "./user.model.js";
import bcrypt from "bcrypt";
import { RoleService } from "../role/role.service.js";
import mongoose from "mongoose";

export class UserService {
    static async createUser(data: any) {
        const { name, email, password } = data;

        if (!name || !email || !password) {
            throw new AppError("Please fill all the required fields", 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existUser = await User.findOne({ email: normalizedEmail });
        if (existUser) {
            throw new AppError("Email already exists", 409);
        }

        if (password.length < 6) {
            throw new AppError("Password must be at least 6 characters long", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const defaultRole = await RoleService.getRoleName("customer");

        if (!defaultRole)
            throw new AppError("Role not found", 404);


        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            roleId: defaultRole._id
        });

        const safeUser = user.toObject() as Partial<IUser>;
        delete safeUser.password;
        return safeUser;
    }

    static async getByEmail(email: string) {
        return User.findOne({ email }).select("+password");
    }

    static async getById(id:string) {
        return User.findById(id)
    }

    static async updateUser(id: string, updateData: any) {

        const findUser = await User.findById(id).select("+password");

        if (!findUser)
            throw new AppError("User not found", 404);

        const { name, email, password } = updateData;

        if (name) updateData.name = name;

        if (email) {
            const normalizedEmail = email.toLowerCase().trim();

            const existEmail = await User.findOne({ email: normalizedEmail, _id: { $ne: id } });

            if (existEmail)
                throw new AppError("Email already exists", 409);

            updateData.email = normalizedEmail;
        }

        if (password) {
            if (password.length < 6)
                throw new AppError("Password must be at least six characters long", 400);

            const hashedPassword = await bcrypt.hash(password, 12);

            updateData.password = hashedPassword;
        }

        const data = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

        return data;
    }

    static async promoteToVendor(userId: string, vendorRoleId: string, session?: any) {
        return await User.findByIdAndUpdate(
            userId, 
            { roleId: vendorRoleId }, 
            { session, new: true }
        );
    }

}
