import express from "express"
import {
    createPost,
    getUserPost,
    likePost,
    getPost,
    getPosts,
     } from "../controllers/post.controller.js"
     import{protectRoute} from "../middleware/authentication.middleware.js"
     import upload from ""

const router = express.Router();


router.get("/", getPosts);
router.get("/postId", getPosts);
router.get("/user/:username", getUserPosts);


//protected routes

router.post("/", protect)

export default router