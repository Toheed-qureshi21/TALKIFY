import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { getReceiverSocketId, io } from "../Socket/socket.js";
import { TryCatch } from "../utils/TryCatch.js";
import cloudinary from "cloudinary";


export const getContactUsers = TryCatch(async (req,res)=>{
    const loggedInUserId = req.user._id;
    const allUsers =  await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    return res.status(200).json(allUsers);
})

export const getMessages = TryCatch(async (req,res)=>{
    const {id:ourId} = req.params;
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
        $or:[
            {senderId:loggedInUserId,receiverId:ourId},
            {senderId:ourId,receiverId:loggedInUserId},
        ]
    })
    return res.status(200).json(messages);
})
export const sendMessage = TryCatch(async (req,res)=>{
    const {id:receiverId} = req.params;
    const senderId = req.user._id;
    const {text}= req.body;
    const image =  req.body.image; 
    if(!text && !image){
        return res.status(400).json({message:"Sending contents are required"});
    }
    let imageUrl;
    if(image){
        const cloudinaryResponse = await cloudinary.uploader.upload(image,{
            folder:"messages"
        })
        imageUrl = cloudinaryResponse.secure_url;
    }

  
    const message = new Message({
        senderId,
        receiverId,
        text:text || "",
        image:imageUrl
    })
    await message.save();
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",message);
    }
    
    return res.status(201).json(message);
})
