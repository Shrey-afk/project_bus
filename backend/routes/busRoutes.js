const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");

// Create Bus
router.post("/create", busController.createBus);

// Delete Bus
router.post("/delete", busController.deleteBus);

// Update Bus
router.post("/update", busController.updateBus);

router.post("/getSingleBus", busController.getSingleBus);

router.get("/allBuses", busController.allBuses);

router.post("/addUser", busController.addUser);

module.exports = router;
