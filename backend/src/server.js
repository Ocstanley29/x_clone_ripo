import express from "express"
import cors from 'cors'
import {clerkMiddleware} from "clerk"
const PORT = process.env.PORT ;
import userRoutes from './routes/user.routes.js'
import commentRoutes from "./routes/comments.routes.js"
//import notificationRoutes from "./routes/notification.js"
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
const app = express(); 
app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());
app.use(arcjetMiddleware);


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notification", notificationRoutes);


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
