import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import { dbconnect } from './config/db.js';
import router from './Routes/routes.js';

const port = process.env.PORT||8005;

const app = express();
app.use(express.json());
app.use('/',router);
app.get("/",(req,res)=>{
    res.json({message:"payment service"});
})

app.listen(port , ()=>{
    dbconnect();
    console.log("payment service running")
})