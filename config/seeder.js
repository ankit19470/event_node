const User= require('../server/user/userModel')
const bcrypt=require("bcrypt")
const saltround=10

admin=()=>{
    User.findOne({email:"admin@gmail.com"})
    .then(userdata=>{
        if(!userdata){
            let userObj=new User()
            userObj.name="Admin"
            userObj.email="admin@gmail.com"
            userObj.password=bcrypt.hashSync("123",saltround)
            userObj.userType=1
            userObj.save()
            console.log('admin seeded');

        }
        else{
            console.log("admin already exists");
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}
module.exports={
    admin
}