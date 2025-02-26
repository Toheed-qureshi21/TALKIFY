import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./database/connectToDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import { app,server } from "./Socket/socket.js";
import path from "path";

dotenv.config();

connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "https://talkify-t4t1.onrender.com",
    credentials: true,
  })
);
 
app.use(express.static("public"));

app.use("/api/user",userRoutes);
app.use("/api/message",messageRoutes);

const __dirname = path.resolve();
if(process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname,"../Frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"Frontend","dist","index.html"));
});
}

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
