import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./database/connectToDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import path from "path";
import { app,server } from "./Socket/socket.js";

dotenv.config();

connectToDB();
const __dirname = path.resolve();
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
 
app.use(express.static(path.join(__dirname,"public")));


app.use("/api/user",userRoutes);
app.use("/api/message",messageRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"Frontend","dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"Frontend","dist","index.html"));
  });
}

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
