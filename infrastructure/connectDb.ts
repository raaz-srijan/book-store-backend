import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDb = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("Database connected successfully");
    } catch (error: any) {
        console.error("Database connection failed:", error.message);
        process.exit(1); 
    }
};