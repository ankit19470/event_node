const moongose=require("mongoose")
const Bookschema = new moongose.Schema({
    userId:{type:moongose.Schema.Types.ObjectId,ref:"users",default:null},
    eventId:{type:moongose.Schema.Types.ObjectId,ref:"events",default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new moongose.model("Books",Bookschema)