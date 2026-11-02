import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    madeBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    name:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    starMark:{
        type:Boolean,
        default:false
    },
    lastUpdate:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

const Project =mongoose.model("Project",projectSchema);
export default Project ;