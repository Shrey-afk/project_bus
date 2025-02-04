const express = require("express");
const router = express.Router();
const {
  addBus,
  deleteBus,
  updateBus,
  addPassengers,
  addConductor,
} = require("../controllers/busController");

// 1. Route for adding a new bus
router.post("/addBus", addBus); // POST request to add a new bus

// 2. Route for deleting a bus by its ID
router.post("/deleteBus", deleteBus); // DELETE request to delete a bus by ID

// 3. Route for updating a bus by its ID
router.post("/updateBus", updateBus); // PATCH request to update bus details

// 4. Route for adding passengers to a bus
router.post("/addPassengers", addPassengers); // POST request to add passengers to a bus

// 5. Route for adding a conductor to a bus
router.post("/addConductor", addConductor); // POST request to assign a conductor to a bus

module.exports = router;
