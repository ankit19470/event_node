const User = require('./userModel')
const Customer = require('../customer/customerModel')
const bcrypt = require("bcrypt")
const saltround = 10
const jwt = require("jsonwebtoken")
const { getAll } = require('../category/categoryController')
const privatekey = "##%&#4553355"
register = (req, res) => {
    var validationerror = []
    if (!req.body.name)
        validationerror.push("name is required")
    if (!req.body.email)
        validationerror.push("email is required")
    if (!req.body.address)
        validationerror.push("address is required")
    if (!req.body.contact)
        validationerror.push("contact is required")

    if (validationerror.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        User.findOne({ email: req.body.email })
            .then(userdata => {
                if (!userdata) {
                    // insert
                    let userobj = new User()
                    userobj.name = req.body.name
                    userobj.email = req.body.email
                    userobj.password = bcrypt.hashSync(req.body.password, saltround)
                    userobj.save()
                        .then(saveRes => {
                            // customer model insert
                            let custmerObj = new Customer()
                            custmerObj.userId = saveRes._id
                            custmerObj.name = req.body.name
                            custmerObj.email = req.body.email
                            custmerObj.password = req.body.password
                            custmerObj.address = req.body.address
                            custmerObj.contact = req.body.contact
                            custmerObj.save()
                                .then(customerSave => {
                                    res.send({
                                        status: 200,
                                        success: true,
                                        message: "Customer register",
                                        data: customerSave
                                    })
                                })
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal Server Error",
                                error: err.message
                            })
                        })
                }
                else {
                    res.send({
                        status: 422,
                        success: false,
                        message: "user Already exist"
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    error: err.message
                })
            })
    }

}

login = (req, res) => {
    var validationerror = []
    if (!req.body.email)
        validationerror.push("email is required")
    if (!req.body.password)
        validationerror.push("password is required")

    if (validationerror.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: "validation error",
            error: validationerror
        })
    } else {
        // email existence
        User.findOne({ email: req.body.email })
            .then(userdata => {
                if (!userdata) {
                    res.send({
                        status: 402,
                        success: false,
                        message: "invalid email"
                    })
                }
                else {
                    // password compare
                    bcrypt.compare(req.body.password, userdata.password, function (err, data) {
                        if (!data) {
                            res.send({
                                status: 422,
                                success: false,
                                message: "Password incorrect"
                            })
                        }
                        else {
                            var tokenObj = {
                                _id: userdata._id,
                                email: userdata.email,
                                name: userdata.name,
                                userType: userdata.userType,
                            }
                            var token = jwt.sign(tokenObj, privatekey)
                            res.send({
                                status: 200,
                                success: true,
                                message: "Login Successfully",
                                token: token,
                                data: userdata
                            })
                        }
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Server Error",
                    error: err.message
                })
            })
    }
}

allGet = (req, res) => {
    Customer.find()
        .then(userdata => {
            res.send({
                status: 200,
                success: true,
                message: 'Data loaded',
                data: userdata
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

module.exports = {
    register, login, allGet
}