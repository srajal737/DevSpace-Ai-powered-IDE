import axios from "axios"
const api = axios.create({
  withCredentials: true,
});

const apiconnector = (method,url,databody,headers,params)=>{
  return api({
        method,
        url,
        data: databody || null,
        headers: headers || null,
        params: params || null,
    })
}

export default apiconnector