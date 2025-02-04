const express = require("express");
const router = express.Router();
const {
  login,
  register,
  assignBus,
  deleteAssignedBus,
} = require("../controllers/conductorController");

// 1. Conductor Login (POST request)
router.post("/login", login); // POST request to log in a conductor

// 2. Conductor Registration (POST request)
router.post("/register", register); // POST request to register a new conductor

// 3. Assign Bus to Conductor (POST request)
router.post("/assign-bus", assignBus); // POST request to assign a bus to a conductor

// 4. Delete the assigned bus from the conductor (POST request)
router.post("/delete-assigned-bus", deleteAssignedBus); // POST request to delete assigned bus

module.exports = router;
