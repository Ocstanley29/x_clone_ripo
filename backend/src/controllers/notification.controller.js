import asyncHandler from "express-async-handler";
import { getAuth} from "@clerk/express"
import Notification from "../models/notification.model.js";
import User from "../models/user.models.js";

export const getNotification = asyncHandler(async(req, res)=>{
    const {userId} = getAuth(req);
    const user = await user.findOne({clerk: userId});
    if (!user) return res.status(404).json({error: "user not found"});

    const notification = await notification.find({to:user._Id})
    .sort({createdAt: -1})
    .populate("from", "userName, firstName, lastName, profilePicture")
    .populate("post","content image")
    .populate("comment", "content")
    res.status(200).json({notifications})
});


export const deleteNotification = asyncHandler(async(req, res)=>{
    const userId = getAuth(req)
    const notificationId = req.params
    
    const user = await user.findOne({clerkId:userId})
    if (!user) return res.status(404).json({error: "user not found"})
    
    const notification = await notification.findOneAndDelete({
        _Id:notificationId,
        to: user._Id
    });
    if (!notification) return res.status(404).json({error:"notification not found"})
    
   res.status(200).json("notification deleted successfully")
});
