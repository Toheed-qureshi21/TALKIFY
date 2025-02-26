import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const protect = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized please login"});
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
}
