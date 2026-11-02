import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }
    ,
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
     credits:{
        type:Number,
        default:100,
       
    },
    profileImg:{
        type:String,
        default:""
    },
    firebaseId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
   
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema);
export default User 