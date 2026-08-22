import express from "express"
import {
    createPost,
    getUserPost,
    likePost,
    getPost,
    getPosts,
     } from "../controllers/post.controller.js"
     import{protectRoute} from "../middleware/authentication.middleware.js"
     import upload from "../middleware/upload.middleware.js"
     import { getPosts, getPost, getUserPosts } from "../controllers/post.controller.js"

     import notifications from "../models/notification.model.js"
     import comment from "../models/coment.model.js"

const router = express.Router();

//public routes
router.get("/", getPosts);
router.get("/postId", getPost);
router.get("/user/:username", getUserPosts);


//protected routes

router.post("/", protectRoute, upload.single."{image}", createPost);

export default router