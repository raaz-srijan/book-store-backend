import "dotenv/config";

const requiredEnvs = [
    "PORT",
    "MONGO_URI",
    "JWT_SECRET_KEY",
    "JWT_SECRET_TIMEOUT",
    "JWT_REFRESH_KEY",
    "JWT_REFRESH_TIMEOUT",
];

requiredEnvs.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
});

export const ENV = {
    PORT: Number(process.env.PORT) || 5000,
    MONGO_URI: process.env.MONGO_URI!,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
    JWT_SECRET_TIMEOUT: process.env.JWT_SECRET_TIMEOUT || "1h",
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY!,
    JWT_REFRESH_TIMEOUT: process.env.JWT_REFRESH_TIMEOUT || "7d",
    CLOUDINARY_CLOUD_NAME: String("CLOUDINARY_CLOUD_NAME"),
    CLOUDINARY_API_KEY: String("CLOUDINARY_API_KEY"),
    CLOUDINARY_API_SECRET: String("CLOUDINARY_API_SECRET"),
};