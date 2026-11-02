import express from 'express'
import dotenv from "dotenv"
import { dbconnect } from './config/db.js'
import router from './Routes/routes.js';
dotenv.config();
const port = process.env.PORT || 8003

const app = express();
app.use(express.json());
app.use('/',router)

app.get('/',(req,res)=>{
    res.json({message:"from ai Services"})
})

app.listen(port ,()=>{
    dbconnect();
    console.log("ai service running")
})