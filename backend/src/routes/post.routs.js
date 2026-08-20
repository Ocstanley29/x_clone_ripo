import express from "express"
import { getPost, getPosts } from "../controllers/post.controller"

const router = express.Router();


router.get("/", getPosts);
router.get("/postId", getPosts);
router.get("/user/:username", getUserPosts);

export default router