import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
        dbName: "Talkify",
    });
    console.log("MongoDB connected");
    
  } catch (error) {
    console.log(error);
  }
};
