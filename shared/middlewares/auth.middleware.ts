import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyJWT } from "../jwt/jwt.js";
import { User } from "../../modules/user/user.model.js";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(new AppError("Authentication required. Please log in.", 401));
        }

        const decoded = verifyJWT(token) as { id: string };

        const currentUser = await User.findById(decoded.id).populate("roleId");

        if (!currentUser) {
             return next(new AppError("User no longer exists.", 401));
        }

        req.user = currentUser;

        next();
    } catch (error) {
        next(new AppError("Invalid or expired token.", 401));
    }
};
