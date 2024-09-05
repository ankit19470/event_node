const { default: mongoose } = require("mongoose")
const moongose=require("mongoose")
const eventSchema=new mongoose.Schema({
    eventTitle:{type:String,default:null},
    profile:{type:String,default:'no_image.jpg'},
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:"categories",default:null},
    price:{type:Number,default:null},
    description:{type:String,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model("events",eventSchema)