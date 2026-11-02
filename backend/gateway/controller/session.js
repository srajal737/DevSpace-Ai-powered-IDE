export const sessiondetail = async(req,res)=>{
    try{
      return res.status(200).json({
        data:req.user
      })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message:"current user session error"
        })
    }
}