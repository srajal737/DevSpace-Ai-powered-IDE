import mongoose, { mongo } from 'mongoose'
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    }
    ,
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"File",
        default:null
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        enum:["file","folder"],
        required:true
    },
    extension:{
        type:String,
        default:""
    },
    language:{
        type:String,
        default:"plaintext"
    },
    content:{
        type:String,
        default:""
    },
    size:{
        type:Number,
        default:0
    },

    
},{timestamps:true});

const File = mongoose.model("File",fileSchema);
export default File;