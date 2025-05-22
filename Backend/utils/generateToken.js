import jwt from "jsonwebtoken";
import { cookieConfig } from "../constant/constant.js";
export const generateToken = (res,id) => {
    const token =  jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"5d"});
    res.cookie("token",token,cookieConfig);
    }