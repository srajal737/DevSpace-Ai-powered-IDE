import express from 'express'
import dotenv from 'dotenv'
import {connectdb} from './config/dbconnection.js'
import router from './routes/routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8002;
app.use(express.json());

app.get('/',(req,res)=>{
    return res.json({
        message:"mess from project service"
    })
})

app.use('/',router);

app.listen(port,()=>{
    connectdb();
    console.log(`project service running at ${port}`)
})
