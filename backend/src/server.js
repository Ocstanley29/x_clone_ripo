import express from "express";

import cors from 'cors'
import {clerkMiddleware} from "@clerk/express"
const PORT = process.env.PORT ;
import userRoutes from "./routes/user.routes.js";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
const app = express(); 
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/users", userRoutes);

 app.get("/", (req, res) => {
    res.send("Hello, World!");
});




app.listen(ENV.PORT, () => console.log(`Server is running on port ${ENV.PORT}`));
// Connect to the database
//connectDB();