// Import required dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");
const conductorRoutes = require("./routes/conductorRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const connectDB = require("./config/db");

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

// Set the server to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
