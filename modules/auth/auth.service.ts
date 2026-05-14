import { AppError } from "../../shared/errors/AppError.js";
import { generateJWT, generateRefreshJWT, verifyRefreshJWT } from "../../shared/jwt/jwt.js";
import bcrypt from "bcrypt";
import { UserService } from "../user/user.service.js";
import { User, type IUser } from "../user/user.model.js";

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
        const refreshToken = await generateRefreshJWT({ id: user._id.toString(), email: user.email });

        user.refreshToken = refreshToken;
        await user.save();

        const safeUser = user.toObject() as Partial<IUser>;
        delete safeUser.password;

        return { safeUser, token, refreshToken }
    }

    static async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new AppError("Refresh token is required", 400);
        }

        const decoded = verifyRefreshJWT(refreshToken) as { id: string };
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            throw new AppError("Invalid or expired refresh token", 401);
        }

        const token = await generateJWT({ id: user._id.toString(), email: user.email });
        const newRefreshToken = await generateRefreshJWT({ id: user._id.toString(), email: user.email });

        user.refreshToken = newRefreshToken;
        await user.save();

        return { token, refreshToken: newRefreshToken };
    }

    static async logout(userId: string) {
        const user = await User.findById(userId);
        if (!user) throw new AppError("User not found", 404);

        user.refreshToken = "";
        await user.save();
        return true;
    }
}