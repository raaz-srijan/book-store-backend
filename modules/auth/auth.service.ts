import { AppError } from "../../shared/errors/AppError.js";
import { generateJWT } from "../../shared/jwt/jwt.js";
import bcrypt from "bcrypt";
import { UserService } from "../user/user.service.js";
import type { IUser } from "../user/user.model.js";


export class AuthService {

    static async login(data: any) {
        const { email, password } = data;

        if (!email || !password)
            throw new AppError("Please fill all the required fields", 400);

        const user = await UserService.getByEmail(email);

        if (!user)
            throw new AppError("Invalid credentials", 401);

        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new AppError("Invalid credentials", 401);

        const token = await generateJWT({ id: user._id.toString(), email: user.email });
        const refreshToken = await generateJWT({ id: user._id.toString(), email: user.email });

        user.refreshToken = refreshToken;
        await user.save();

        const safeUser = user.toObject() as Partial<IUser>;
        delete safeUser.password;

        return { safeUser, token }

    }
}