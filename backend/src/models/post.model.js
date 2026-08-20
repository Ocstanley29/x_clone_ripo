import mongoose from "mongoose";

const PostSchema= new mongoose.Schema(
    {
        user:{
            type:String,
            ref:User,
            required:true,
        },

        content:{
            type:String,
            maxLength:300,
        },

        image:{
            type:String,
            default:"",
        },

        likes:[
           { type:mongoose.Schema.Types.ObjectId,
            ref:"User",

        },
        {timestamps:true}
        ],

    }
);

const Post = mongoose.model("Post", Postschema);

export default Post;