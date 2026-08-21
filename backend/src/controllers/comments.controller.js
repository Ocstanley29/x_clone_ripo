import asyncHandler from "express-async-handler";
import  {getauth} from "@clerk/express";
import Comment from "../models/coment.model.js";
import post from "../models/post.model.js";
import User from "../models/user.models.js";
import Notification from "../models/notification.model.js";



export const getComment = asyncHandler(async(req ,res)=>{
    const {postId} = req.params
    const comment = await comment.find({post:postId})
    .sort({createdAt: -1})
    .populate("user", "userName firstName lastName profilePicture")

    res.status(200).json({comment})

});


export const createComments = asyncHandler(async(req, res)=>{
    const {userId} = getauth(req)
    const {postId} = req.params
    const {content} = req.body

    if(!content||content.trim()=== ""){
        return res.status(400).json({error:"content is required"})
    }

    const user = await user.findOne({clerkId:userId})
    const post = await post.findById(postId)

    if(!user || !post) return res.status(404).json({error:"user not found"})


        const comment = await comment.create({
            user:user._Id,
            post:postId,
            comment,
        });

//link the comment to the post

await post.findByIdAndUpdate(postId,{
    $push:{comments: comment._Id},

});

//create notification if not own post

if(post.user.tostring() !==user._Id.tostring()) {
    await Notification.create({
        Form:user._Id,
        to:post.user,
        type:"comment",
        post:postId,
        comment:comment._Id
    });

}
res.status(201).json({comment})

});

export const deleteComment =asyncHandler(async(req, res)=>{
    const {userId} = getauth(req)
    const {commentId} =req.params

    const user = await user.findOne({clerkId:userId})
    const comment =await Comment.findById(commentId)

    if(!user || !Comment){
        return res.status(404).json({error:"user or comment not found"});
    }
    if(comment.user.tosstring() !==user._id.tostring()) {
        return res.status(403).json({error:"you can only delete your own comment"});
    }
    //remove comment

    await post.findByIdAndUpdate(comment.post, {
        $pull:{comment:commentId},
    });
    //delete comment
    await Comment.findOneByIdAndDelete(commentId)

    res.status(200).json({message:"comment deleted"});




});
