import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
    }
});

const userSocketObject = {};

io.on("connection",(socket)=>{

    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketObject[userId] = socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketObject));

    socket.on("disconnect",()=>{
        delete userSocketObject[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketObject));
    });
});
export const getReceiverSocketId = (userId)=>{
    return userSocketObject[userId];
}
export {app,io,server};