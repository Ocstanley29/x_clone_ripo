import express from "express"
import { getUserProfile, syncUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/authentication.middleware";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router()


router.get("/profile/:username", getUserProfile);

router.post("/sync",protectRoute, syncUser);
router.post("/me",protectRoute, getCurrentUser );
router.put("/profile/",protectRoute, updateProfile);
router.post("/follow/:targetUserId",protectRoute, followUser);



export default router;