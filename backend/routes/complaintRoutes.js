const express = require("express");
const router = express.Router();
const {
  addComplaint,
  deleteComplaint,
  getAllComplaints,
} = require("../controllers/complaintController");

// 1. Add a new complaint (POST request)
router.post("/addComplaint", addComplaint); // POST request to add a complaint

// 2. Delete a complaint by complaintId for a specific user (POST request)
router.post("/delete", deleteComplaint); // POST request to delete a specific complaint

// 3. Get all complaints (POST request)
router.post("/all", getAllComplaints); // POST request to get all complaints

module.exports = router;
