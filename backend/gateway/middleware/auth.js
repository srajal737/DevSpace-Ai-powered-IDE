import redis from "../../shared/redis/redis.js";
export const auth  = async(req,res,next)=>{
    try{
        const sessionId = req.cookies?.session;
       
        if(!sessionId){
            return res.status(401).json({
                message:"unauthorized user"
            })
        }

        const key = `session-${sessionId}`;
        const user = await redis.get(key);
        if(!user){
            return  res.status(401).json({message:"session not found"});
        }
        const data = JSON.parse(user);
        req.user = data;
        next();

    }catch(e){
        return res.status(500).json({
            message:"something went wrong while authorization"
        })
    }
}