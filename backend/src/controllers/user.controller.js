import asyncHandler from "express-async-handler"
import User from "../models/user.models.js"
import {getAuth} from "@clerck/express"


export const getUserProfile = asyncHandler(async(req, res)=>{
   const {username}=req.params;
   const user =await User.findOne({username});
   if (!user){
     res.status(404).json({error:"user not found"})
   }
   res.status(200).json({user});

});


export const updateUserProfile = asyncHandler (async(req, res)=>{
    const  {userId} = getAuth(req);
    const user = User.findOneAndUpdate({clerkId:userId}, req.body,{new:true})
     if (!user){
        res.status(404).json({error:"user not found"})
       }
        res.status (200).json({user});
});

export const syncUser = asyncHandler(async)
     