import mongoose from "mongoose";

const userschema = new mongoose.schema({
    clerckid:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },

    userName:{
        type:String,
        required:true,
        unique:true
    },
    profilePicture:{
        type:String,
        default:"",
    },

    bannerImage:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:"",
        maxLength:170,
    },
    location:{
        type:String,
        default:"",
    },

    followers:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:"User",
        },
    ],

    following:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:"User",
        },
    ],

},
{timestamps:true});
const User = mongoose.model("User", userschema);

export default User;