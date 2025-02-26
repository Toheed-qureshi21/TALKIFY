import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { TryCatch } from "../utils/TryCatch.js";
import cloudinary from "../utils/cloudinary.js";
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least of 6 characters " });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        let avatar = req.body.avatar || "/images/avatar.jpg";
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });
        generateToken(res, user._id);
        const userWithoutPassword = { ...user._doc, password: undefined };

        return res.status(201).json({userWithoutPassword, message: "User registered successfully"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const login = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(res, user._id);
    const userWithoutPassword = { ...user._doc, password: undefined };
    return res.status(200).json({ userWithoutPassword, message: "Logged in successfully" });

})
export const logout = TryCatch(async (req, res) => {

    res.cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
    });
    return res.status(200).json({ user:req.user,message: "Logged out successfully" })
});
export const checkUser = TryCatch(async (req, res) => {    
    return res.status(200).json(req.user);
});
export const updatePic = TryCatch(async (req, res) => {
    const { profilePic } = req.body;
    if (!profilePic) {
        return res.status(400).json({ message: "Profile picture is required" });
    }
    let cloudinaryResponse;

        // cloudinaryResponse = await cloudinary.uploader.upload(profilePic);
        cloudinaryResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "user_profiles",
            format: "jpg", // Convert any image (WEBP, PNG, etc.) to JPG
            transformation: [{ width: 500, height: 500, crop: "limit" }]
        });
    
    const user = await User.findByIdAndUpdate(req.user._id, {
        avatar: cloudinaryResponse.secure_url
    },
        {
            new: true
        }).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user, message: "Profile picture updated successfully" });
})
