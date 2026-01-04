import express from "express"
import { getUserProfile } from "../controllers/uer.controller";
import { protectRoute } from "../middleware/authentication.middleware";
import { updateUserProfile } from "../controllers/uer.controller.js";

const router = express.Router()


router.get("/profile/:username", getUserProfile);
router.put("/profile/",protectRoute, updateUserProfile);



export default router;