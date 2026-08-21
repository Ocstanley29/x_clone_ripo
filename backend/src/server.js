import express from "express"
import cors from 'cors'
import {clerkMiddleware} from "@clerk/express"
const PORT = process.env.PORT ;
import userRoutes from './routes/user.routes.js'
import comment from "./routes/comments.routes.js"

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
const app = express(); 
app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);


//error handling middlware

app.use((err,req, res, next) => {
    console.error("unhandled error", err);res.status(500).json({err:err.message|| "internal server error"});

});


const startserver = async()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT,()=>console.log("server is running on port :ENV.PORT"))
        
    }catch(error){
        console.error("fail to start server",error.message);
        process.exit(1)
    }
};
startserver();
 




// Connect to the database
