import express from 'express'
import dotenv from 'dotenv'
import {connectdb} from './config/dbconnection.js'
import router from './routes/auth.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
app.use(express.json());

app.use('/',router);  //so url is http://localhost:8000/api/auth/login
app.get('/',(req,res)=>{
    return res.json({
        message:"mess from auth service"
    })
})


app.listen(port,()=>{
    connectdb();
    console.log(`auth running at ${port}`)
})
