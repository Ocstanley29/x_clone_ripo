import express from "express"
import { getUserProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/authentication.middleware";
import { updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router()


router.get("/profile/:username", getUserProfile);
router.put("/profile/",protectRoute, updateUserProfile);



export default router;