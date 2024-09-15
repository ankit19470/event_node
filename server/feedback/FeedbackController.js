const Feedback=require('./FeedbackModel')
addFeedback = (req, res) => {

    var validationerror = []
    if (!req.body.name)
        validationerror.push("name is required")

    if (!req.body.email)
        validationerror.push("email is required")
    if (!req.body.suggestion)
        validationerror.push("suggestion is required")
    if (!req.body.review)
        validationerror.push("review is required")

    if (validationerror.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        //duplicacy
        Feedback.findOne({ name: req.body.name })
            .then(feedbackData => {
                if (!feedbackData) {
                    // insertion
                    let feedbackObj = new Feedback()
                    feedbackObj.name = req.body.name
                    feedbackObj.email = req.body.email
                    feedbackObj.suggestion = req.body.suggestion

                    feedbackObj.review = req.body.review


                    feedbackObj.save()
                        .then((saveRes) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: 'record inserted',
                                data: saveRes
                            })
                        })
                        .catch((err) => {
                            res.send({
                                status: 500,
                                success: false,
                                message: 'Internal Server Error',
                                error: err.message
                            })

                        })
                }
                else {
                    res.send({
                        status: 422,
                        success: false,
                        message: 'Record is already exists',
                        data: feedbackData
                    })
                }
            })
            .catch((err) => {
                res.send({
                    status: 500,
                    success: false,
                    message: 'Internal server error',
                    error: err.message
                })
            })

    }
}
getallFeedback = (req, res) => {
    Feedback.find()
        .then(feedbackData => {
            res.send({
                status: 200,
                success: true,
                message: 'Data loaded',
                data: feedbackData
            })
        })
        .catch(err => {
            res.send({
                success: 500,
                success: false,
                message: 'internal server error',
                error: err.message
            })
        })
}
deleteFeedback = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("Id is required")
    if (validationerror.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: 'validaiton error',
            error: validationerror
        })
    }
    else {
        Feedback.findOne({ _id: req.body._id })
            .then(feedbackData => {
                if (!feedbackData) {
                    res.send({
                        status: 404,
                        success: false,
                        message: 'Data not found',
                        data: feedbackData
                    })
                }
                else {
                    // delete
                    Feedback.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.send({
                                status: 200,
                                success: true,
                                message: 'Record is deleted'
                            })
                        })
                }

            })

            .catch(err => {
                res.send({
                    status: 422,
                    success: false,
                    message: "internal server error",
                    error: err.message
                })

            })
    }
}
UpdateFeedback=(req,res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("id is required")
if(validationerror.length > 0){
    res.send({
        status:404,
        success:false,
        message:"validation error",
        error:validationerror
    })
}
else{
    Feedback.findOne({_id:req.body._id})
    .then(feedbackData=>{
        if(!feedbackData){
            res.send({
                status:420,
                success:false,
                message:"data not found"
            })
        }
        else{
            if(req.body.name)
                feedbackData.name=req.body.name
            if(req.body.email)
                feedbackData.email=req.body.email
            if(req.body.suggestion)
            feedbackData.suggestion = req.body.suggestion
            if(req.body.review)
            feedbackData.review = req.body.review

            feedbackData.save()
            .then(saveRes=>{
                res.send({
                    status: 200,
                    success: true,
                    message: "Record is updated",
                    data: saveRes
                })
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
module.exports={
   addFeedback,getallFeedback,deleteFeedback,UpdateFeedback
}