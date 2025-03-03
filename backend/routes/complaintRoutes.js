const express = require("express");
const {
  createComplaint,
  deleteComplaint,
  getAllComplaints,
} = require("../controllers/complainController");

const router = express.Router();

router.post("/add", createComplaint); // Protected route to create a complaint
router.post("/delete", deleteComplaint); // Protected route to delete a complaint
router.get("/all", getAllComplaints); // Protected route to delete a complaint

module.exports = router;
