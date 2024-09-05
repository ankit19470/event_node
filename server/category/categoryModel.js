const mongoose=require("mongoose")
const categoryschema = new mongoose.Schema({
    categoryName:{type:String,default:null},
    thumbnail:{type:String,default:'no_image.jpg'},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model("categories",categoryschema)