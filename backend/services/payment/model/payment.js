import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    credits:{
        type:Number,
        required:true
    },
      plan:{
        type:String,
        enum:["Pro" , "Basic"] 
    },
    razorpayOrderId:{
        type:String,
        required:true
    },
    razorpayPaymentId:{
        type:String,
        defualt:null
    },
    status:{
        type:String,
        enum:["paid" , "created" , "failed"],
        default:"pending"
    }

},{
    timestamps:true,
})

const Payment = mongoose.model("Payment" , paymentSchema);
export default Payment