const Booking = require("./BookingModel")
const User = require("../user/userModel")
addingBooking = (req, res) => {
    var validationerror = []
    if (!req.body.eventId)
        validationerror.push("eventId is required")
    if (!req.body.userId)
        validationerror.push("userId is required")
    if (!req.body.eventDate)
        validationerror.push("eventDate is required")
    if (!req.body.eventTime)
        validationerror.push("eventTime is required")
    if (!req.body.eventPlace)
        validationerror.push("eventPlace is required")
    if (!req.body.eventMessage)
        validationerror.push("eventMessage is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "Validation error",
            error: validationerror
        })
    }
    else {
        Booking.findOne({
            userId: req.body.userId,
            eventId: req.body.eventId
        })
            .then((bookingdata) => {
                if (!bookingdata) {
                    let bookingObj = new Booking()
                    bookingObj.userId = req.body.userId
                    bookingObj.eventId = req.body.eventId
                    bookingObj.eventDate = req.body.eventDate
                    bookingObj.eventTime = req.body.eventTime
                    bookingObj.eventPlace = req.body.eventPlace
                    bookingObj.eventMessage = req.body.eventDate
                    bookingObj.save()
                        .then(saveRes => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Added Booking successfully",
                                data: saveRes
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
                else {
                    res.send({
                        status: 422,
                        success: false,
                        message: "Record is already exists",
                        data: bookingdata
                    })
                }
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
gettingBooking=(req,res)=>{
    Booking.find(req.body)
    .populate("userId")
    .populate("eventId")
    .then(bookingdata=>{
        res.send({
            status:200,
            success:true,
            message:"Data Loaded",
            data:bookingdata
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
updateBooking=(req,res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("id is required")
    if(validationerror.length>0){
        res.send({
            status:404,
            success:false,
            message:"validation error",
            error:validationerror
        })
    }
    else{
        Booking.findOne({_id:req.body._id})
        .then(bookingdata=>{
            if(!bookingdata){
                res.send({
                    status:420,
                    success:false,
                    message:"Data not found",    
                })
            }
            else{
            if(req.body.eventPlace)
                bookingdata.eventPlace=req.body.eventPlace
            if(req.body.eventDate)
                bookingdata.eventDate=req.body.eventDate
            if(req.body.eventTime)
                bookingdata.eventTime=req.body.eventTime
            if(req.body.eventMessage)
                bookingdata.eventMessage=req.body.eventMessage
            bookingdata.save()
            .then(saveRes=>{
                res.send({
                    status:200,
                    success:"true",
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

singleBook=(req,res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("id is required")
    if(validationerror.length>0){
        res.send({
            status:404,
            success:false,
            message:"Validation error",
            error:validationerror
        })
    }
    else{
        Booking.findOne({ _id:req.body._id})
        .populate("userId")
        .populate("eventId")
        .then(bookingdata=>{
            res.send({
                status:200,
                success:true,
                message:"Data is found",
                data:bookingdata
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
module.exports = {
    addingBooking,gettingBooking,updateBooking,singleBook
}