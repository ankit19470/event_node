const { stack } = require("../../routes/apiRoutes")
const Category = require("./categoryModel")

add = (req, res) => {

    var validationerror = []
    if (!req.body.categoryName)
        validationerror.push("category name is required")

    if (!req.body.thumbnail)
        validationerror.push("image is required")

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
        Category.findOne({ categoryName: req.body.categoryName })
            .then(categoryData => {
                if (!categoryData) {
                    // insertion
                    let categoryObj = new Category()
                    categoryObj.categoryName = req.body.categoryName
                    categoryObj.thumbnail = "categoryimages/" + req.body.thumbnail
                    categoryObj.save()
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
                        data: categoryData
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

getAll = (req, res) => {
    Category.find()
        .then(categoryData => {
            res.send({
                status: 200,
                success: true,
                message: 'Data loaded',
                data: categoryData
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

deleteData = (req, res) => {
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
        Category.findOne({ _id: req.body._id })
            .then(categoryData => {
                if (!categoryData) {
                    res.send({
                        status: 404,
                        success: false,
                        message: 'Data not found',
                        data: categoryData
                    })
                }
                else {
                    // delete
                    Category.deleteOne({ _id: req.body._id })
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

// updateData = (req, res) => {
//     var validationerror = []
//     if (!req.body._id)
//         validationerror.push("id is required")
//     if (validationerror.length > 0) {
//         res.send({
//             status: 404,
//             success: false,
//             message: "validation error",
//             error: validationerror
//         })
//     }
//     else {
//         Category.findOne({_id:req.body._id})
//             .then(categoryData => {
//                 if (!categoryData) {
//                     res.send({
//                         status: 420,
//                         success: false,
//                         message: "Data not found",
//                     })
//                 }
//                 else {

//                     if (req.body.categoryName)
//                         categoryData.categoryName = req.body.categoryName
//                     if (req.body.thumbnail)
//                         categoryData.thumbnail = "categoryimages/" + req.body.thumbnail
//                     categoryData.save()
//                         .then(saveRes => {
//                             res.send({
//                                 status: 200,
//                                 success: true,
//                                 message: "Record is updated",
//                                 data: saveRes
//                             })
//                         })
//                 }
                

//             })
//             .catch(err => {
//                 res.send({
//                     status: 500,
//                     success: false,
//                     message: "Internal server error",
//                     error: err.message
//                 })
//             })
//     }
// }
dataUpdate=(req,res)=>{
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
    Category.findOne({_id:req.body._id})
    .then(categoryData=>{
        if(!categoryData){
            res.send({
                status:420,
                success:false,
                message:"data not found"
            })
        }
        else{
            if(req.body.categoryName)
                categoryData.categoryName=req.body.categoryName
            if(req.body.thumbnail)
                categoryData.thumbnail="categoryimages/" + req.body.thumbnail
            categoryData.save()
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
getSingle=(req,res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("id is required")
    if(validationerror.length>0){
        res.send({
            status:404,
            success:false,
            message:'validation error',
            error:validationerror
        })
    }else{
        Category.findOne({_id:req.body._id})
        .then(categoryData=>{
                res.send({
                    status:200,
                    success:true,
                    message:'Data Loaded',
                    data:categoryData
                })
            
        })
        .catch((err)=>{
            res.send({
                status:500,
                success:false,
                message : 'Internal server error',
                errors:err.message
            })
        })
    }
}
module.exports = {
    add, getAll, deleteData,getSingle,dataUpdate
}