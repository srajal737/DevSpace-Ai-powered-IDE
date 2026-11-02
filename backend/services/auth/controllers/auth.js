import { app } from "../config/firebase.js";
import { getAuth } from 'firebase-admin/auth'
import User from '../models/user.js'
import crypto from "crypto"
import redis from "../../../shared/redis/redis.js";
export const googlelogin = async(req,res)=>{
    try{
        const {token} = req.body;
        const decoded=await getAuth(app).verifyIdToken(token);

        let userget = await User.findOne({firebaseId:decoded.uid})
        if(!userget){
            userget = await User.create({firebaseId:decoded.uid,name:decoded.name , email:decoded.email , profileImg:decoded.picture})
        }

        const sessionId = crypto.randomUUID();
        await redis.set(`user-session-${userget._id}`, sessionId);
        await redis.set(`session-${sessionId}`,JSON.stringify({
            name:userget.name,
            email:userget.email,
            _id:userget._id,
            profileImg:userget.profileImg,
            credits:userget.credits
        }),"EX",7*24*60*60); //expire in 7 days

        //storing in cookie  -->> see will take session id from cookie and find detail using redis for session management 

        //secure true when deploy .
        res.cookie("session", sessionId,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production", //when development then false;
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:7*24*60*60*1000
        })


        return res.status(200).json({
            message:"success",
            data:userget
        })
    }
    catch(e){
        return res.status(500).json({
            message:"login error occured"
        })
    }
}

export const logout = async(req,res)=>{
    try{
        const sessionId = req.cookies?.session;//to get cookie use req
        await redis.del(`session-${sessionId}`);

        res.clearCookie("session");//to set cookie use res simple

        res.status(200).json({
            message:"logout sessionfully"
        })
    }catch(e){
        res.status(500).json({
            messgae:"logout failed!!"
        })
    }
}