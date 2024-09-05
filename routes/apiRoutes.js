const router=require("express").Router()
const categoryContoller=require("../server/category/categoryController")
const userController=require('../server/user/userController')
const eventController=require("../server/event/eventController")
const BookingController=require("../server/booking/BookingController")
const multer=require("multer")

// category multer
const categorystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/categoryimages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    var newname=file.fieldname + '-' + uniqueSuffix + file.originalname
req.body["thumbnail"]=newname
cb(null,newname)
    }
  })
  
  const categoryupload = multer({ storage: categorystorage })

// event multer

const eventstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/eventimages')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  var newname=file.fieldname + '-' + uniqueSuffix + file.originalname
req.body["profile"]=newname
cb(null,newname)
  }
})

const eventupload = multer({ storage: eventstorage })

// categroy
router.post("/category/add",categoryupload.single('thumbnail'),categoryContoller.add)
router.post("/category/getall",categoryContoller.getAll)
router.post("/category/delete",categoryContoller.deleteData)
router.post("/category/update",categoryupload.single('thumbnail'),categoryContoller.dataUpdate)
router.post("/category/single",categoryContoller.getSingle)

//event
router.post("/event/add",eventupload.single('profile'),eventController.add)
router.post("/event/getall",eventController.getall)
router.post("/event/single",eventController.getsingle)
router.post("/event/update",eventupload.single('profile'),eventController.updateEvent)
router.post("/event/delete",eventController.deleteEvent)

// booking
router.post("/booking/add",BookingController.addingBooking)
router.post("/booking/getall",BookingController.gettingBooking)
router.post("/booking/update",BookingController.updateBooking)
router.post("/booking/singlebook",BookingController.singleBook)





//user
router.post("/user/register",userController.register)
router.post("/user/login",userController.login)
router.post("/user/getall",userController.allGet)







module.exports=router