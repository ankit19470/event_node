const categoryModel = require("../server/category/categoryModel");
// const customerModel = require("../server/customer/customerModel");
const eventModel = require("../server/event/eventModel");
const bookingModel = require("../server/booking/BookingModel");

const feedbackModel = require("../server/feedback/FeedbackModel");
const userModel = require("../server/user/userModel");


const adminDash = async (req, res) => {
    let categories = await categoryModel.find({ status: true }).countDocuments();
    // let customers = await customerModel.find({ status: true }).countDocuments();
    let bookings = await bookingModel.find({ status: true }).countDocuments();

    let events = await eventModel.find({ status: true }).countDocuments();

    let feedbacks = await feedbackModel.find({ status: true }).countDocuments();
    let users = await userModel.find({ status: true }).countDocuments();



    let activeCategories = await categoryModel.find({ status: true });
    // let activeCustomer = await customerModel.find({ status: true });
    let activeBookind = await bookingModel.find({ status: true });

    let activeEvent = await eventModel.find({ status: true });
    let activeFeedback= await feedbackModel.find({ status: true });
    let activeUser = await userModel.find({ userType: 2, status: true });

    res.send({
        status: 200,
        success: true,
        message: "Dashboard",
        totalcategory: categories,
        // totalcustomer: customers,
        totalbooking: bookings,

        totalevent: events,
        totalfeedback: feedbacks,
        totaluser:users,
        activeCategories: activeCategories.length,
        // activeCustomer: activeCustomer.length,
        activeEvent: activeEvent.length,
        activeFeedback: activeFeedback.length,
        activeUser: activeUser.length,
        
    })

}
module.exports = {
    adminDash
}