import {Server} from "socket.io";
import http from "http";
import express from "express";
// import cors from "cors";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["https://talkify-livid.vercel.app"],
    }
});

const userSocketObject = {};

io.on("connection",(socket)=>{

    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketObject[userId] = socket.id;
        socket.join(userId)
    }
    io.emit("getOnlineUsers",Object.keys(userSocketObject));

    socket.on("disconnect",()=>{
        delete userSocketObject[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketObject));
    });
    socket.on("sendMessage", ({ receiverId, message }) => {
        
        io.to(receiverId).to(userId).emit("newMessage", message);
    });
});
export const getReceiverSocketId = (userId)=>{
    return userSocketObject[userId];
}
export {app,io,server};