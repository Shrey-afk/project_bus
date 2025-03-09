const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const http = require("http");
const { Server } = require("socket.io");

const tempRoutes = require("./routes/tempUserRoutes");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");
const complainRoutes = require("./routes/complaintRoutes");
const conductorRoutes = require("./routes/conductorRoutes");
const connectDB = require("./config/db");

connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const chatHistory = [];
const activeUsers = {}; // Store active users with their socket IDs

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("addUser", (username) => {
    activeUsers[socket.id] = username;
    io.emit("activeUsers", Object.values(activeUsers));
  });

  socket.emit("chatHistory", chatHistory);

  socket.on("sendMessage", (msg) => {
    const message = { ...msg, sender: msg.username };
    chatHistory.push(message);
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    delete activeUsers[socket.id];
    io.emit("activeUsers", Object.values(activeUsers));
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.use("/tempUser", tempRoutes);
app.use("/user", userRoutes);
app.use("/bus", busRoutes);
app.use("/complain", complainRoutes);
app.use("/conductor", conductorRoutes);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "citycommuteoperator@gmail.com", // Replace with your email
    pass: "tqst jecc gyef fnwn", // Replace with your email password or app password
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
    from: " citycommuteoperator@gmail.com", // Replace with your email
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
    from: " citycommuteoperator@gmail.com", // Replace with your email
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
    from: " citycommuteoperator@gmail.com", // Replace with your email
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

app.post("/send-conductor", async (req, res) => {
  const { name, email, password } = req.body;

  const mailOptions = {
    from: " citycommuteoperator@gmail.com", // Replace with your email
    to: email,
    subject: "Your login creds for conductor login",
    text: `Hello ${name} your account has been made your login details are as follows email is ${email} and password is ${password} `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    // Store OTP in local storage (replace this with a database in production)
    res.status(200).json({ success: true, message: "Creds sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send Mail. Please try again." });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
