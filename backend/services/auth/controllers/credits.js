import redis from "../../../shared/redis/redis.js";
import User from "../models/user.js";

export const creditAdd = async(req,res)=>{
    try{
        const { userId  , credits} = req.body;
        if(!userId){
            return res.status(401).json({message:"userId not found"})
        }

        const userget =await User.findById(userId);
        if(!userget){
            return res.status(401).json({message:"user not found"})
        }

        userget.credits+=Number(credits) ;
       await userget.save();
       

        const sessionId =await redis.get(`user-session-${userId}`);
        await redis.set(`session-${sessionId}`,JSON.stringify({
                    name:userget.name,
                    email:userget.email,
                    _id:userget._id,
                    profileImg:userget.profileImg,
                    credits:userget.credits
                }),"EX",7*24*60*60); //expire in 7 days
        
     return res.status(200).json({
        success:true,
        data:userget.credits
     })
    }catch(e){
           return res.status(500).json({
            message:"credit addition error"
        })
    }
}




export const creditMinus = async(req,res)=>{
    try{
        const { userId , amount} = req.body;
        if(!userId){
            return res.status(401).json({message:"userId not found"})
        }

        const updateduser = await User.findOneAndUpdate({
            _id:userId,
        } , {
            $inc:{
                credits: -Number(amount)
            }
        },{returnDocument:"after"}).select("name email credits profileImg")

        if(!updateduser){
            return res.status(401).json({message:"insufficient credits"});
        }

        const sessionId =await redis.get(`user-session-${userId}`);
        await redis.set(`session-${sessionId}`,JSON.stringify({
                    name:updateduser.name,
                    email:updateduser.email,
                    _id:updateduser._id,
                    profileImg:updateduser.profileImg,
                    credits:updateduser.credits
                }),"EX",7*24*60*60); //expire in 7 days
        
     return res.status(200).json({
        success:true,
        data:updateduser.credits
     })
    }catch(e){
           return res.status(500).json({
            message:"credit deduction error"
        })
    }
}


export const getCredits = async(req,res)=>{
    try{
          const { userId } = req.body;
           if(!userId){
            return res.status(401).json({message:"userId not found"})
        }
          const user = await User.findById(userId)
            .select("credits");

             if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user.credits
        });
    }catch(e){
          return res.status(500).json({
            message: "Credit fetching error"
        });
    }
}