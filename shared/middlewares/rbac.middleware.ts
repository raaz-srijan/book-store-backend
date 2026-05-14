import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/errors/AppError.js";

export const restrictTo = (...roles: ("admin" | "vendor" | "customer")[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError("User session not found. Please log in again.", 401));
        }

        const roleName = (req.user.roleId as any)?.name;

        if (!roleName || !roles.includes(roleName)) {
            return next(new AppError("Access denied. You do not have the required permissions.", 403));
        }

        next();
    };
};