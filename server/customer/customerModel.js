const mongoose=require("mongoose")
const customerSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users',default:null},
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    address:{type:String,default:null},
    contact:{type:Number,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model("customers",customerSchema)