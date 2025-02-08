// Import required dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");
const conductorRoutes = require("./routes/conductorRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const connectDB = require("./config/db");
const nodemailer = require("nodemailer"); // Import nodemailer

connectDB();
// Initialize the Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use("/user", userRoutes);
app.use("/complaint", busRoutes);
app.use("/bus", conductorRoutes);
app.use("/conductor", complaintRoutes);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "exploreease678@gmail.com", // Replace with your email
    pass: "pcqr idsb xnmv aubk", // Replace with your email password or app password
  },
});

// Route to send OTP email
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: "exploreease678@gmail.com", // Replace with your email
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    // Store OTP in local storage (replace this with a database in production)
    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", otp });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send OTP. Please try again." });
  }
});

// Set the server to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
