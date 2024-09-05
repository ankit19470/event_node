const Event=require("./eventModel")
add=(req,res)=>{
    var validationerror=[]
    if(!req.body.eventTitle)
        validationerror.push("eventTitle is required")
    if(!req.body.profile)
        validationerror.push("profile is required")
    if(!req.body.categoryId)
        validationerror.push("categoryId is required")
    if(!req.body.price)
        validationerror.push("price is required")
    if(!req.body.description)
        validationerror.push("description is required")
    if(validationerror.length>0){
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }else{
        Event.findOne({eventTitle:req.body.eventTitle})
        .then(eventdata=>{
            if(!eventdata){
                let eventobj=new Event
                eventobj.eventTitle=req.body.eventTitle
                eventobj.profile="eventimages/" + req.body.profile
                eventobj.categoryId=req.body.categoryId
                eventobj.price=req.body.price
                eventobj.description=req.body.description
                eventobj.save()
                .then(saveRes=>{
                    res.send({
                        status: 200,
                        success: true,
                        message: "insert successfully",
                        data: saveRes
                    })
                })
                .catch(err => {
                    res.send({
                        status: 500,
                        success: false,
                        message: "Internal server",
                        error: err.message
                    })
                })
            }else{
                res.send({
                    status: 420,
                    success: false,
                    message: "Record is already exists",
                    data: eventdata
                })
            }
        })
        .catch(err=>{
            res.send({
                status:500,
                success:false,
                message:"internal server error",
                error:err.message
            })
        })

    }
}
getall=(req,res)=>{
    Event.find()
    .populate("categoryId")
    .then(eventdata => {
        res.send({
            status: 200,
            success: true,
            message: "data Loaded",
            data: eventdata
        })
    })
    .catch(err => {
        res.send({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        })
    })
}
getsingle=(req,res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("id is required")
    if(validationerror.length>0){
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }else{
        Event.findOne({_id:req.body._id})
        .populate("categoryId")
        .then(eventdata=>{
            res.send({
                status:200,
                success:true,
                message:"Data Found",
                data:eventdata
            })
      
        })
       .catch((err)=>{
        res.send({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        })
       })
    }
}
updateEvent=(req,res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("id is required")
    if(validationerror.length>0){
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }else{
        Event.findOne({_id:req.body._id})
        .then(eventdata=>{
            if(!eventdata){
                res.send({
                    status:500,
                    success:false,
                    message:"Data not Found"
                })
            }else{
                if(req.body.eventTitle)
                    eventdata.eventTitle=req.body.eventTitle
                if(req.body.profile)
                    eventdata.profile="eventimages/" +req.body.profile
                if(req.body.categoryId)
                    eventdata.categoryId=req.body.categoryId
                if(req.body.price)
                    eventdata.price=req.body.price
                if(req.body.description)
                    eventdata.description=req.body.description
                eventdata.save()
                .then(saveRes=>{
                    res.send({
                        status:200,
                        success:true,
                        message:"Record is updated",
                        data:saveRes
                    })
                })
                .catch(err=>{
                    res.send({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err.message
                    })
                })

            }
        })
    }

}
deleteEvent=(req,res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("id is required")
    if(validationerror.length>0){
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }else{
        Event.deleteOne({_id:req.body._id})
        .then(eventdata=>{
            res.send({
                status: 200,
                success: true,
                message: "Event deleted",
                data: eventdata
            })
        })
        .catch(err => {
            res.send({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            })
        })
    }
}
module.exports={
    add,getall,getsingle,updateEvent,deleteEvent
}