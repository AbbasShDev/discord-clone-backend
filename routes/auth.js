const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const {
  loginValidator,
  registerValidator,
} = require("../middleware/validator");
const { auth } = require("../middleware/authMiddleware");

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/logout", auth, logout);

module.exports = router;
