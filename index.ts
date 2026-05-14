import express from "express";

const app = express();

app.use(express.json());

const PORT = ENV.PORT;

import { ENV } from "./infrastructure/env.js";
import { connectDb } from "./infrastructure/connectDb.js";
import connectCloudinary from "./infrastructure/connectCloudinary.js";

import * as route from "./routes/routes.js";

app.use("/api/v1/user", route.userRoute);
app.use("/api/v1/permissions", route.permissionRoute);
app.use("/api/v1/roles", route.roleRoute);
app.use("/api/v1/auth", route.authRoute);
app.use("/api/v1/authors", route.authorRoute);
app.use("/api/v1/category", route.categoryRoute);
app.use("/api/v1/genre", route.genreRoute);

app.listen(PORT, ()=> {
    console.log(`Server started on ${PORT}`);
    connectDb();
    connectCloudinary();
})