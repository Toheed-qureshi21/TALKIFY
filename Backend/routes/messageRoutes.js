import express from "express";
import { protect } from "../middlewares/auth.js";
import { getContactUsers, getMessages, sendMessage } from "../controllers/messageControllers.js";
const router = express.Router();

router.get("/users",protect,getContactUsers);
router.get("/:id",protect,getMessages);
router.post("/send/:id",protect,sendMessage);
export default router;
