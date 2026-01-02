import mongoose, { Mongoose } from "mongoose";


const notificationSchema = mongoose.Schema({
    from:{
        type:mongoose.schema.TypeObjectId,
        ref:"User",
        required:true,
    },
    to:{
        type:mongoose.Schema.TypeObjectId,
        ref:"User",
        required:true,
    },

    types:{
        type:String,
        required:true,
        enum:["follow", "like", "comment"],
    },

    post:{
        types:Mongoose.Schema.TypeObjectId,
        ref:"post",
        default:null,
    },

    comment:{
        types:Mongoose.Schema.TypeObjectId,
        ref:"comment",
        default:null,
    },
},

{timestamps:true},
);

const Notification =mongoose.model("Notification", notificationSchema);

export default Notification;