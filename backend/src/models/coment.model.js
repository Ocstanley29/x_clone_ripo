import mongoose, { Types } from "mongoose";

const commentSchema=mongoose.Schema({
    user:{
        Types: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    post:{
        Types: mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true,
    },

    content:{
        Type:String,
        required:true,
        maxLength:300,
    },

    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
},
{timestamps:true},

);
const Comment =mongoose.model("Comment", commentSchema);

export default Comment;