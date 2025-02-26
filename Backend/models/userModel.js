import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: "/images/avatar.jpg" },
},{
    timestamps: true,
});

export const User = mongoose.model("User", userSchema);


