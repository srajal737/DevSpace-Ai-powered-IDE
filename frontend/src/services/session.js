import { SESSIONAPI } from "../utils/api";
import apiconnector from "../utils/apiconnector"

export const sessionget = async()=>{
    try{
        const {data} = await apiconnector("get",SESSIONAPI);
        return data;
    }
    catch(e){
        console.log(e);
        return null;
    }
}