const Book=require('./BookModel')
const User=require("../user/userModel")
addBook = (req, res) => {
    var validationerror = []
    if (!req.body.eventId)
        validationerror.push("eventId is required")
    if (!req.body.userId)
        validationerror.push("userId is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "Validation error",
            error: validationerror
        })
    }
    else {
        Book.findOne({
            userId: req.body.userId,
            eventId: req.body.eventId
        })
            .then((bookdata) => {
                if (!bookdata) {
                    let bookingObj = new Book()
                    bookingObj.userId = req.body.userId
                    bookingObj.eventId = req.body.eventId
                    bookingObj.save()
                        .then(saveRes => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Added Book successfully",
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
                        data: bookdata
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
getallBook=(req,res)=>{
    Book.find(req.body)
    .populate("userId")
    .populate("eventId")

    .then(bookdata => {
        res.send({
            status: 200,
            success: true,
            message: "data Loaded",
            data: bookdata
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
module.exports={
    getallBook,addBook
}