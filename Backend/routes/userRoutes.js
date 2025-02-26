import express from "express";
import { checkUser, login, logout, signup, updatePic } from "../controllers/userControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login);
router.post("/logout",protect,logout);
router.get("/me",protect,checkUser);
router.post("/updatepic",protect,updatePic);
export default router;
