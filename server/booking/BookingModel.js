const moongose=require("mongoose")
const BookingSchema=new moongose.Schema({
    eventId:{type:moongose.Schema.Types.ObjectId,ref:"events",default:null},
    userId:{type:moongose.Schema.Types.ObjectId,ref:"users",default:null},
    eventDate:{type:String,default:null},
    eventTime:{type:String,default:null},
    eventPlace:{type:String,default:null},
    eventMessage:{type:String,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new moongose.model("bookings",BookingSchema)