import express from "express"
import { protectRoute } from "../middleware/authentication.middleware"
 import {getNotifications, deleteNotifications} from "../controllers/notification.controller.js"

 const router =express.Router();

 router.get("/", protectRoute, getNotifications);
 router.delete("/notificationId", protectRoute, getNotifications)

 export default router;