import jwt from "jsonwebtoken";
import type { JwtPayload, SignOptions } from "jsonwebtoken";
import { ENV } from "../../infrastructure/env.js";

const JWT_KEY = ENV.JWT_SECRET_KEY;
const JWT_TIMEOUT = ENV.JWT_SECRET_TIMEOUT;
const JWT_REFRESH_KEY = ENV.JWT_REFRESH_KEY;
const JWT_REFRESH_TIMEOUT = ENV.JWT_REFRESH_TIMEOUT;

export interface IPayload extends JwtPayload {
    id:string;
    email:string;
    role?:string;
}

export const generateJWT = (payload:IPayload, expiresIn=JWT_TIMEOUT as NonNullable<SignOptions["expiresIn"]>) => {
    return jwt.sign(payload, JWT_KEY, {expiresIn});
}

export const verifyJWT = (token:string) => {
    return jwt.verify(token, JWT_KEY);
}

export const generateRefreshJWT = (payload:IPayload, expiresIn=JWT_REFRESH_TIMEOUT as NonNullable<SignOptions["expiresIn"]>) => {
    return jwt.sign(payload, JWT_REFRESH_KEY, {expiresIn});
}

export const verifyRefreshJWT = (refreshToken:string) => {
    return jwt.verify(refreshToken, JWT_REFRESH_KEY);
}