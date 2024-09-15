const express = require('express')
const app = express()
const port = 1000
const Razorpay = require("razorpay")
const config = require("./config/db")
const BookingModels=require('./server/booking/BookingModels')
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.static(__dirname + "/public"))

const cors = require("cors")
app.use(cors())

const routes = require("./routes/apiRoutes")
app.use("/api", routes)

const seeder = require('./config/seeder')
seeder.admin()

app.get('/', (req, res) => {
    res.send("welcome to new project")
})
app.get('/name', (req, res) => {
    res.send("my name is ankit sharma")
})
app.get('/home', (req, res) => {
    res.send({
        status: 200,
        success: true,
        msg: "default name"
    })
})
app.get('/api/bookings', async (req, res) => {
    const { userId } = req.query; // userId sent as a query parameter
  
    try {
      // Fetch bookings for the specified user
      const bookings = await BookingModels.find({ userId });
  
      // Return the bookings as a JSON response
      res.status(200).json({ success: true, data: bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching bookings' });
    }
  });
  
app.post('/order', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: "rzp_test_QMbFBXUkfTtFVM",   // Your Razorpay Key ID
        key_secret: "5L82Dduz7vynTw8Ia4oufc4d"  // Your Razorpay Secret
    });

    const options = {
        amount: req.body.amount,   // Amount in paise (e.g., 50000 for 500 INR)
        currency: req.body.currency || 'INR',   // Default to INR if no currency is passed
        receipt: `receipt_${Date.now()}`,  // Unique receipt ID for tracking
        payment_capture: 1    // Auto capture the payment
    };

    try {
        const response = await razorpay.orders.create(options);  // Create order
        res.json({
            order_id: response.id,    // Razorpay order ID
            currency: response.currency,    // Currency (e.g., INR)
            amount: response.amount    // Amount in paise
        });
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});

// Route to fetch payment details
app.get("/payment/:paymentId", async (req, res) => {
    const { paymentId } = req.params;

    const razorpay = new Razorpay({
        key_id: "rzp_test_QMbFBXUkfTtFVM",   // Your Razorpay Key ID
        key_secret: "5L82Dduz7vynTw8Ia4oufc4d"  // Your Razorpay Secret
    });

    try {
        const payment = await razorpay.payments.fetch(paymentId);   // Fetch payment details
        if (!payment) {
            return res.status(404).send("Payment not found");
        }

        res.json({
            status: payment.status,    // Payment status (e.g., captured, failed)
            method: payment.method,    // Payment method (e.g., card, netbanking)
            amount: payment.amount,    // Amount in paise
            currency: payment.currency // Currency (e.g., INR)
        });
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch payment details" });
    }
});


app.listen(port, (error) => {
    if (error) {
        console.log('error occured', error);
    } else {
        console.log('server is running at ' + port);
    }
})