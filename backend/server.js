const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const tempRoutes = require("./routes/tempUserRoutes");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");
const complainRoutes = require("./routes/complaintRoutes");
const connectDB = require("./config/db");

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tempUser", tempRoutes);
app.use("/user", userRoutes);
app.use("/bus", busRoutes);
app.use("/complain", complainRoutes);

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

app.post("/send-busPass", async (req, res) => {
  const { user, months } = req.body;

  if (!user) {
    return res.status(400).json({ error: "Email is required" });
  }

  const mailOptions = {
    from: "exploreease678@gmail.com", // Replace with your email
    to: user?.email,
    subject: "Bus Pass Update",
    text: `Your Bus Pass has been succesfully generated . Your login details are as follows email :${user?.email} and password ${user?.password} Your bus pass is ${user?.busPass} `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    // Store OTP in local storage (replace this with a database in production)
    res.status(200).json({ success: true, message: "Pass sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send Mail. Please try again." });
  }
});

app.post("/failed-busPass", async (req, res) => {
  const { user } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const mailOptions = {
    from: "exploreease678@gmail.com", // Replace with your email
    to: user?.email,
    subject: "Bus Pass Update",
    text: `Your request for bus pass was canceled`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    // Store OTP in local storage (replace this with a database in production)
    res.status(200).json({ success: true, message: "Mail sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send mail. Please try again." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
