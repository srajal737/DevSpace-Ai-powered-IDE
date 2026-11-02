
import { GOOGLELOGINAPI , LOGOUTAPI } from "../utils/api"
import apiconnector from "../utils/apiconnector"
import { setuserData } from "../redux/userslice";

export const googlelogin = async(token)=>{
    try{
        const response = await apiconnector("post",GOOGLELOGINAPI,{token});
        return response.data.data;
    }
    catch(e){
        console.log(e);
        return null;
    }
}
export const logout = async(dispatch)=>{
    try{
         await apiconnector("post",LOGOUTAPI);
         dispatch(setuserData(null));
        return 
    }
    catch(e){
        console.log(e);
        return ;
    }
}