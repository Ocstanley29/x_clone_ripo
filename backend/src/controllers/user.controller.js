import asyncHandler from "express-async-handler"
import User from "../models/user.models.js"
import Notification from "../models/notification.model.js";
import {getAuth} from "clerck"
import { clerkClient } from "clerk";


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

export const syncUser = asyncHandler(async(req, res)=>{
   const {userId} = getAuth(req);

   const existingUser = await User.findOne({clerk:userId});
   if (existingUser) {
      return res.status(200).json({user:existingUser, message:"user already exist"});
   }

   const clerkUser = await clerkClient.users.getUser(userId);

   const userData= {
      clerkId:userId,
      email:clerkUser.emailAddress[0].emailAddress,clerkUser,
      firstName:firstName || "",
      lastName: lastName || "",
      userName:clerkUser.emailAddress[0].emailAddress.split("@")[0],
      profilePicture: clerkUser.imageUrl || "",
   }

   const user = await User.create(userData);
   res.status(201).json({user,message:"user created successfully"});
});




export const getCurrentUser=asyncHandler(async(req, res)=>{
   const {userId } = getAuth(req);
   const user = await user.findOne({clerkId:userId});

   if(!user) return res.status(404).json("user not found");
    res.status(200).json({user});
});


export const followUser = asyncHandler(async(req, res)=>{
   const {userId} = getAuth(req);
   const {targetedUserId} = req.params
   if (userId ===targetedUserId) return res.status(400).json({error:"you cannot follow yourself"});
   
const currentUser = await User.findOne({clerkId:userId});
const targetUser = await User.findById(targetUserId);

if (!currentUser || !targetUser) return res.status(404).json({error:"user not found"});


const isfollowing =currentUser.following.includes(targetedUserId);

if (isFollowing){ 

   //unfollowing

   await User.findByIdAndUpdate(currentUser._Id,{
      $pull:{following : targetedUser._Id},

   });
 
}else{
   // follow
   await User.findByIdAndUpdate(currentUser._Id,{
      $push:{following:tergetedUser._Id},
   });
   //create notification

   await Notification.create({
      from:currentUser._Id,
      to:targetUserId,
      type:"follow",
   });

}
res.status(200).json({
   message:isFollowing  ?"user unfollowed successfully" : "user followed successfully"

});
});
     