import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy';
import { auth } from './middleware/auth.js';
import { sessiondetail } from './controller/session.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))


app.use(cookieParser());

//SERVICE directing... 
app.use("/api/auth" , proxy(process.env.AUTH_SERVICE))

app.use("/api/project",auth , proxy(process.env.PROJECT_SERVICE , {
    proxyReqOptDecorator:(proxyReqOpts,req)=>{   //req is same of above middleware request

        if(req.user){
              proxyReqOpts.headers["x-user-id"]=req.user?._id
        }
      return proxyReqOpts;
    }
    
}))//when authorized then only go to project part so use auth middleware ...



app.use("/api/ai",auth , proxy(process.env.AI_SERVICE, {
    proxyReqOptDecorator:(proxyReqOpts,req)=>{   //req is same of above middleware request

        if(req.user){
              proxyReqOpts.headers["x-user-id"]=req.user?._id
        }
      return proxyReqOpts;
    }
    
}))//when authorized then only go to project part so use auth middleware ...


app.use("/api/payment",auth , proxy(process.env.PAYMENT_SERVICE, {
    proxyReqOptDecorator:(proxyReqOpts,req)=>{   //req is same of above middleware request

        if(req.user){
              proxyReqOpts.headers["x-user-id"]=req.user?._id
        }
      return proxyReqOpts;
    }
    
}))//when authorized then only go to project part so use auth middleware ...


app.get('/',(req,res)=>{
    return res.json({
        message:"mess from gateway"
    })
})

app.get('/api/me',auth,sessiondetail);

app.listen(port,()=>{
    console.log(`gateway running at ${port}`)
})
