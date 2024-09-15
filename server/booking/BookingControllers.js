// controllers/bookingController.js
const BookingModels = require('./BookingModels');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
};
