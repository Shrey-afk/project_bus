const express = require("express");
const {
  createTempUser,
  deleteTempUser,
  loginTempUser,
  getAllTempUsers,
} = require("../controllers/tempUserController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a temporary user
router.post("/create", createTempUser);

// Route to delete a temporary user (Protected Route)
router.post("/delete", deleteTempUser);

router.get("/getAlltempUser", getAllTempUsers);

module.exports = router;
