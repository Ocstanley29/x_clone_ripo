import express from "express";
import { protectRoute } from "../middleware/authentication.middleware";
import {createComment, getComments, deleteComment} from "../controllers/comments.controller.js"


const router = express.Router

//public routes
router.get("/post/:postId", getComments)


//protected routes
router.post("/post/:postId",protectRoute, createComment);
router.delete("/:commentId",protectRoute, createComment);


export default router;