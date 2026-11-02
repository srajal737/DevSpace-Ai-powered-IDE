import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
export const dbconnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connect");
    }
    catch(e){
        console.log(e);
        console.log("db not connected");
    }
}