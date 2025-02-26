import jwt from "jsonwebtoken";
export const generateToken = (res,id) => {
    const token =  jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"5d"});
    res.cookie("token",token,{
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development",
    });
}