const express = require("express");
const router = express.Router();
const {
  registerConductor,
  loginConductor,
  getSingleConductor,
  getAllConductors,
  addBus,
  updateBus,
  deleteBus,
  changePassword,
} = require("../controllers/conductorController");

// Register a conductor
router.post("/register", registerConductor);

// Login a conductor
router.post("/login", loginConductor);

// Get a single conductor by ID
router.post("/singleConductor", getSingleConductor);

// Get all conductors
router.get("/allConductors", getAllConductors);

// Add a bus to a conductor
router.post("/add-bus", addBus);

// Update a conductor's bus
router.post("/update-bus", updateBus);

// Delete a conductor's bus
router.post("/delete-bus", deleteBus);

router.post("/changePassword", changePassword);

module.exports = router;
