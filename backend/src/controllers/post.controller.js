import expressAsyncHandler from "express-async-handler";
import Post from "../models/post.model.js"
import User from "../models/user.models.js"
import getAuth from "@clerk/express"
import cloudinary from "../config/cloudinary.js";



export const getPosts = asyncHandler(async(req, res)=>{
    const posts = await Post.find()
    .sort({createdat: -1})
    .populate("user", "userName firstName lastName profilePicture")
    .populate({
        path:"comment",
        populate:{
            path:"user",
            select:"userName firstName lastName profilePicture"
        }
    });
    res.status(200).json({posts});
});




export const getPost = asyncHandler(async(req, res)=>{

    
})

export const getUserPost = asyncHandler(async(req, res)=>{
    
})

export const createPost = asyncHandler(async(req, res)=>{
    const {userId}=getAuth(req);
    const{content}=req.body;
    const imageFile = req.file;
    if(!content && !imageFile){
        return res.status(400).json({error: "post must contain an image of a text"});
    }
    const user = await user.findOne({clerkId});
    if(!user) return res.status(404).json({error:"user not found"})
        let imageUrl = "";
    if (imageFile) {
        try {
            const baseImage = `{data:$imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`;
            const uploadResponse =await cloudinary.uploader.upload(base64Image, {
                folder: "social_media_post",
                resource_type : "image",
                transformation: [
                    {width:800, height:600, crop:"limit"},
                    {quality:"auto"},
                    {format:"auto"}
                ],
                imageUrl = uploadResponse.secure_Url;
            })
        } catch ( uploadError) {
            console.log("cloudinary upload error");
            return res.status(400 ).json({error:"fail to upload image"})
            
        }
    }
    const post = await Post.create({
        user= user._Id,
        content:content ||"",
        image:imageUrl, 
    });

    res.status(201).json({post})
    
})


export const likePost = asyncHandler(async (req ,res)=>{
    const {userId} =getAuth(req);
    const {postId} = req.params;
    const user = await user.findOne({clerkId: userId});
    const post = await post.findById({postId});

    

})